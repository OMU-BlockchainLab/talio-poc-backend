import { USER_ERRORS } from 'Constants/errors'

import { Invite } from 'Models'

import { Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function declineInvite({
  inviteToken,
  userId,
  transaction,
}: {
  inviteToken: string
  userId: string
  transaction?: Transaction
}) {
  const invite = await Invite.findOne({
    where: { inviteToken, invitedUserId: userId, acceptedAt: null },
    transaction,
  })

  if (!invite) {
    throw new CommonError(USER_ERRORS.INVITE_NOT_FOUND)
  }

  await invite.destroy({ transaction })

  return true
}
