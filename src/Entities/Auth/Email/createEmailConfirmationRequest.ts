import ms from 'ms'
import { nanoid } from 'nanoid'

import { EXPIRES } from 'Config'

import { EmailCredential } from 'Models'
import EmailConfirmationRequest, {
  EmailConfirmationRequestState,
} from 'Models/EmailConfirmationRequest'

import { doInTransaction, Transaction } from 'Services/Db'

const lifetime = ms(EXPIRES.EMAIL_CONFIRMATION)

export default async function createEmailConfirmationRequest({
  emailCredential,
  transaction: tx,
}: {
  emailCredential: EmailCredential
  transaction?: Transaction
}) {
  const expiresAt = new Date(Date.now() + lifetime)
  const token = nanoid(36)

  return doInTransaction(async transaction => {
    await EmailConfirmationRequest.destroy({
      where: {
        emailCredentialId: emailCredential.id,
        state: EmailConfirmationRequestState.pending,
      },
      transaction,
    })

    return EmailConfirmationRequest.create(
      { emailCredentialId: emailCredential.id, token, expiresAt },
      { transaction },
    )
  }, tx)
}
