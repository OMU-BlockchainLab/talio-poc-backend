import { AUTH_ERRORS } from 'Constants/errors'
import { PASSWORD_REGEX } from 'Constants/regex'

import EmailEntity from 'Entities/Auth/Email'
import NotificationEntity from 'Entities/Notification'

import { ChangeEmailPasswordRequestState } from 'Models/ChangeEmailPasswordRequest'

import TokensService from 'Services/Auth/Tokens'
import { doInTransaction, Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'
import { hashPassword } from 'Services/Password'

export default async function changeEmailPassword({
  token,
  password,
  transaction: tx,
}: {
  token: string
  password: string
  transaction?: Transaction
}) {
  if (!password.match(PASSWORD_REGEX)) {
    throw new CommonError(AUTH_ERRORS.PASSWORD_REGEX_NO_MATCH)
  }

  const request = await EmailEntity.getChangeEmailPasswordRequest(token)

  const { emailCredential } = request

  await doInTransaction(async transaction => {
    if (EmailEntity.isChangeEmailPasswordRequestTokenExpired(request)) {
      await request.destroy({ transaction })

      throw new CommonError(AUTH_ERRORS.PASSWORD_TOKEN_EXPIRED)
    }

    const passwordDigest = await hashPassword(password)

    await request.update(
      {
        state: ChangeEmailPasswordRequestState.processed,
        processedAt: new Date(),
      },
      { transaction },
    )

    await emailCredential.update({ passwordDigest }, { transaction })
  }, tx)

  await TokensService.deleteTokens([emailCredential.userId])

  await NotificationEntity.sendEmailPasswordChanged(emailCredential)
}
