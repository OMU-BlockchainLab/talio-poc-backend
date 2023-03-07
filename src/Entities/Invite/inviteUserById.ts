import { nanoid } from 'nanoid'

import { USER_ERRORS } from 'Constants/errors'

import NotificationEntity from 'Entities/Notification'

import { Contact, Invite } from 'Models'
import User, { UserRole } from 'Models/User'

import SNSService from 'Services/AWS/SNS'
import { doInTransaction, Op, Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function inviteUserById({
  creatorId,
  invitedUserId,
  transaction: tx,
}: {
  creatorId: string
  invitedUserId: string
  transaction?: Transaction
}) {
  const {
    alreadyInvited,
    fromContact,
    toContact,
    invite,
  } = await doInTransaction(async transaction => {
    if (creatorId === invitedUserId) {
      throw new CommonError(USER_ERRORS.CANNOT_INVITE_SELF)
    }

    const creator = await User.findOne({
      where: { id: creatorId, role: UserRole.user },
      transaction,
    })

    const invitedUser = await User.findOne({
      where: { id: invitedUserId, role: UserRole.user },
      transaction,
    })

    if (!invitedUser || !creator) {
      throw new CommonError(USER_ERRORS.NOT_FOUND)
    }

    const invite = await Invite.findOne({
      where: {
        [Op.or]: [
          { creatorId, invitedUserId },
          { creatorId: invitedUserId, invitedUserId: creatorId },
        ],
      },
      transaction,
    })

    if (
      invite?.acceptedAt ||
      (invite?.invitedUserId === invitedUserId &&
        invite?.creatorId === creatorId)
    ) {
      throw new CommonError(USER_ERRORS.ALREADY_INVITED)
    }

    // If invited user already invite creator
    const alreadyInvited = invite && invite?.invitedUserId === creatorId

    if (alreadyInvited) {
      await invite?.update({ acceptedAt: new Date() }, { transaction })
      const fromContact = await Contact.create(
        { creatorId: invitedUserId, userId: creatorId },
        { transaction },
      )
      const toContact = await Contact.create(
        { creatorId, userId: invitedUserId },
        { transaction },
      )

      return { toContact, fromContact, alreadyInvited }
    }

    const inviteToken = nanoid()

    return {
      alreadyInvited,
      invite: await Invite.create(
        { creatorId, invitedUserId, inviteToken },
        { transaction },
      ),
    }
  }, tx)

  if (alreadyInvited) {
    await SNSService.sendMessage({
      topic: SNSService.topics.app,
      subject: SNSService.subjects.contactCreated,
      message: { userIds: [creatorId, invitedUserId] },
    })

    await NotificationEntity.sendContactCreated(fromContact)
    await NotificationEntity.sendContactCreated(toContact)
  } else {
    await NotificationEntity.sendInviteByUserIdCreated(invite)
  }

  return true
}
