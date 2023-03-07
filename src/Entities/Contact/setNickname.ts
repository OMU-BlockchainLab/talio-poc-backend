import { USER_ERRORS } from 'Constants/errors'

import { Contact } from 'Models'

import SNSService from 'Services/AWS/SNS'
import { Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function setNickname({
  creatorId,
  userId,
  nickname,
  transaction,
}: {
  creatorId: string
  userId: string
  nickname: string
  transaction?: Transaction
}) {
  const contact = await Contact.findOne({
    where: { creatorId, userId },
    transaction,
  })

  if (!contact) {
    throw new CommonError(USER_ERRORS.CONTACT_NOT_FOUND)
  }

  await contact.update({ nickname }, { transaction })

  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.contactUpdated,
    message: { contactId: contact.id },
  })

  return contact
}
