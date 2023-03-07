import {
  Contact,
  EmailCredential,
  Invite,
  Request,
  User,
  UserProfile,
  Wallet,
} from 'Models'

import Tokens from 'Services/Auth/Tokens'
import SNSService from 'Services/AWS/SNS'
import { doInTransaction, Op, Transaction as Tx } from 'Services/Db'

export default async function deleteUser({
  id,
  transaction: tx,
}: {
  id: string
  transaction?: Tx
}) {
  return doInTransaction(async transaction => {
    await Tokens.deleteTokens([id])

    await Contact.destroy({
      where: { [Op.or]: { userId: id, creatorId: id } },
      transaction,
    })
    await EmailCredential.destroy({ where: { userId: id }, transaction })
    await Invite.destroy({ where: { invitedUserId: id }, transaction })
    await Request.destroy({
      where: { [Op.or]: { fromUserId: id, toUserId: id } },
      transaction,
    })
    await UserProfile.destroy({ where: { userId: id }, transaction })
    await User.destroy({ where: { id }, transaction })
    await Wallet.destroy({ where: { userId: id }, transaction })

    try {
      await SNSService.sendMessage({
        topic: SNSService.topics.app,
        subject: SNSService.subjects.userDeleted,
        message: { userId: id },
      })
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('[DELETE USER] send message', error.message)
    }
  }, tx)
}
