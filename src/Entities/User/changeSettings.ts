import { USER_ERRORS } from 'Constants/errors'

import User from 'Models/User'

import SNSService from 'Services/AWS/SNS'
import { Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function changeSettings({
  userId,
  groupOnlyContacts,
  transaction,
}: {
  userId: string
  groupOnlyContacts: boolean
  transaction?: Transaction
}) {
  const user = await User.findOne({ where: { id: userId }, transaction })

  if (!user) throw new CommonError(USER_ERRORS.NOT_FOUND)

  await user.update({ groupOnlyContacts }, { transaction })

  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.userUpdated,
    message: { userId: user.id },
  })

  return user
}
