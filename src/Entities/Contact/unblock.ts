import { USER_ERRORS } from 'Constants/errors'

import { Contact } from 'Models'

import SNSService from 'Services/AWS/SNS'
import { Op, Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function unblock({
  creatorId,
  userId,
  transaction,
}: {
  creatorId: string
  userId: string
  transaction?: Transaction
}) {
  const contact = await Contact.findOne({
    where: { creatorId, userId, blockedAt: { [Op.ne]: null } },
    transaction,
  })

  if (!contact) {
    throw new CommonError(USER_ERRORS.CONTACT_NOT_FOUND)
  }

  await contact.update({ blockedAt: null }, { transaction })

  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.contactUnblocked,
    message: { contactId: contact.id },
  })

  return contact
}
