import { USER_ERRORS } from 'Constants/errors'

import NotificationEntity from 'Entities/Notification'

import { Contact, Invite } from 'Models'

import SNSService from 'Services/AWS/SNS'
import { doInTransaction, Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function acceptInvite({
  inviteToken,
  userId,
  silent = false,
  transaction: tx,
}: {
  inviteToken: string
  userId: string
  silent?: boolean
  transaction?: Transaction
}) {
  const { fromContact, toContact, invite } = await doInTransaction(
    async transaction => {
      const invite = await Invite.findOne({
        where: { inviteToken, invitedUserId: userId, acceptedAt: null },
        transaction,
      })

      if (!invite) {
        if (silent) return false

        throw new CommonError(USER_ERRORS.INVITE_NOT_FOUND)
      }

      await invite.update({ acceptedAt: new Date() }, { transaction })

      const fromContact = await Contact.create(
        {
          creatorId: invite.creatorId,
          userId: invite.invitedUserId,
          phone: invite.invitedPhone,
        },
        { transaction },
      )

      const toContact = await Contact.create(
        { creatorId: invite.invitedUserId, userId: invite.creatorId },
        { transaction },
      )

      return { fromContact, toContact, invite }
    },
    tx,
  )

  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.contactCreated,
    message: { userIds: [invite.invitedUserId, invite.creatorId] },
  })

  await NotificationEntity.sendContactCreated(fromContact)
  await NotificationEntity.sendContactCreated(toContact)

  return true
}
