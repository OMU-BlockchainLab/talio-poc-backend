import { DateTime } from 'luxon'

import { EmailConfirmationRequest } from 'Models'

export default function isEmailConfirmationTokenExpired(
  emailConfirmationRequest: EmailConfirmationRequest,
) {
  return (
    DateTime.local() > DateTime.fromJSDate(emailConfirmationRequest.expiresAt)
  )
}
