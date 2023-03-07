import { AUTH_ERRORS, USER_ERRORS } from 'Constants/errors'
import { PASSWORD_REGEX } from 'Constants/regex'

import AuthEmailEntity from 'Entities/Auth/Email'
import NotificationEntity from 'Entities/Notification'

import { EmailCredential } from 'Models'
import { EmailConfirmationRequestState } from 'Models/EmailConfirmationRequest'
import { EmailCredentialState } from 'Models/EmailCredential'
import { UserState } from 'Models/User'

import { doInTransaction, Op, Transaction } from 'Services/Db'
import { CommonError } from 'Services/Errors'
import { createScopedLog } from 'Services/Log'
import { hashPassword } from 'Services/Password'

const log = createScopedLog('[Mutation/verifyEmail]')

export default async function confirmEmail({
  password,
  token,
  transaction: tx,
}: {
  password: string
  token: string
  transaction?: Transaction
}) {
  if (!password.match(PASSWORD_REGEX)) {
    throw new CommonError(AUTH_ERRORS.PASSWORD_REGEX_NO_MATCH)
  }

  const emailConfirmationRequest = await AuthEmailEntity.getEmailConfirmationRequest(
    token,
  )

  const { emailCredential } = emailConfirmationRequest

  const { user } = emailCredential

  if (!user) {
    throw new CommonError(USER_ERRORS.NOT_FOUND)
  }

  const isConfirmationProcessed =
    emailConfirmationRequest.state === EmailConfirmationRequestState.processed

  const isCredentialActive =
    emailCredential.state === EmailCredentialState.active

  if (isConfirmationProcessed || isCredentialActive) {
    throw new CommonError(AUTH_ERRORS.EMAIL_ALREADY_VERIFIED)
  }

  return doInTransaction(async transaction => {
    if (
      AuthEmailEntity.isEmailConfirmationTokenExpired(emailConfirmationRequest)
    ) {
      const newEmailConfirmationRequest = await AuthEmailEntity.createEmailConfirmationRequest(
        {
          emailCredential,
          transaction,
        },
      )

      await NotificationEntity.sendEmailConfirmationRequest({
        emailCredential,
        emailConfirmationRequest: newEmailConfirmationRequest,
      })

      throw new CommonError(AUTH_ERRORS.CONFIRMATION_TOKEN_EXPIRED)
    }

    await emailConfirmationRequest.update(
      {
        state: EmailConfirmationRequestState.processed,
        processedAt: new Date(),
      },
      { transaction },
    )

    await emailCredential.update(
      {
        state: EmailCredentialState.active,
        confirmedAt: new Date(),
        passwordDigest: await hashPassword(password),
      },
      { transaction },
    )

    await user.update({ state: UserState.active })

    await EmailCredential.destroy({
      where: {
        state: { [Op.ne]: EmailCredentialState.active },
        email: emailCredential.email,
      },
      transaction,
    })

    log.info(`email verified: ${emailCredential.email}`)

    return user
  }, tx)
}
