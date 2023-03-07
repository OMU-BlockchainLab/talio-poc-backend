import ms from 'ms'
import { nanoid } from 'nanoid'

import { EXPIRES } from 'Config'

import NotificationEntity from 'Entities/Notification'

import { EmailCredential } from 'Models'
import ChangeEmailPasswordRequest, {
  ChangeEmailPasswordRequestState,
} from 'Models/ChangeEmailPasswordRequest'

import { doInTransaction, Transaction } from 'Services/Db'

const lifetime = ms(EXPIRES.CHANGE_EMAIL_PASSWORD)

export default async function createChangeEmailPasswordRequest({
  emailCredential,
  transaction: tx,
}: {
  emailCredential: EmailCredential
  transaction?: Transaction
}) {
  return doInTransaction(async transaction => {
    const changeEmailPasswordRequest = await ChangeEmailPasswordRequest.create(
      {
        emailCredentialId: emailCredential.id,
        token: nanoid(36),
        state: ChangeEmailPasswordRequestState.pending,
        expiresAt: new Date(Date.now() + lifetime),
      },
      { transaction },
    )

    await NotificationEntity.sendChangeEmailPasswordRequest({
      emailCredential,
      changeEmailPasswordRequest,
    })
  }, tx)
}
