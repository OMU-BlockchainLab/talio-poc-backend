import { AUTH_ERRORS } from 'Constants/errors'

import AuthEmailEntity from 'Entities/Auth/Email'
import NotificationEntity from 'Entities/Notification'

import { CommonError } from 'Services/Errors'

export default async function checkEmailConfirmationToken(token: string) {
  const emailConfirmationRequest = await AuthEmailEntity.getEmailConfirmationRequest(
    token,
  )

  if (
    AuthEmailEntity.isEmailConfirmationTokenExpired(emailConfirmationRequest)
  ) {
    const { emailCredential } = emailConfirmationRequest

    const newEmailConfirmationRequest = await AuthEmailEntity.createEmailConfirmationRequest(
      { emailCredential },
    )

    await NotificationEntity.sendEmailConfirmationRequest({
      emailCredential,
      emailConfirmationRequest: newEmailConfirmationRequest,
    })

    throw new CommonError(AUTH_ERRORS.CONFIRMATION_TOKEN_EXPIRED)
  }
}
