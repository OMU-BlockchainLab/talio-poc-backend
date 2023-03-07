import { nanoid } from 'nanoid'

import { USER_ERRORS } from 'Constants/errors'

import { Invite } from 'Models'

import { doInTransaction, Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function inviteUserByPhone({
  creatorId,
  invitedPhone,
  transaction: tx,
}: {
  creatorId?: string
  invitedPhone?: string
  transaction?: Transaction
}) {
  return doInTransaction(async transaction => {
    const invite = await Invite.findOne({
      where: { creatorId, invitedPhone },
      transaction,
    })

    if (invite) {
      throw new CommonError(USER_ERRORS.ALREADY_INVITED)
    }

    const inviteToken = nanoid()

    await Invite.create(
      { creatorId, invitedPhone, inviteToken },
      { transaction },
    )

    // TODO: add notifications

    return true
  }, tx)
}
