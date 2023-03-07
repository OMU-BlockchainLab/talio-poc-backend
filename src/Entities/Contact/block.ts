import { DateTime } from 'luxon'

import { USER_ERRORS } from 'Constants/errors'

import { Contact } from 'Models'

import SNSService from 'Services/AWS/SNS'
import { Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'

export default async function block({
  creatorId,
  userId,
  blockReason,
  transaction,
}: {
  creatorId: string
  userId: string
  blockReason?: string
  transaction?: Transaction
}) {
  const contact = await Contact.findOne({
    where: { creatorId, userId },
    transaction,
  })

  if (!contact) {
    throw new CommonError(USER_ERRORS.CONTACT_NOT_FOUND)
  }

  await contact.update(
    { blockedAt: DateTime.local().toSQL(), blockReason },
    { transaction },
  )

  await SNSService.sendMessage({
    topic: SNSService.topics.app,
    subject: SNSService.subjects.contactBlocked,
    message: { contactId: contact.id },
  })

  return contact
}
