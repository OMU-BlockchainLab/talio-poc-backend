import { DateTime } from 'luxon'

import { ChangeEmailPasswordRequest } from 'Models'

export default function isChangeEmailPasswordRequestTokenExpired(
  changeEmailPasswordRequest: ChangeEmailPasswordRequest,
) {
  return (
    DateTime.local() > DateTime.fromJSDate(changeEmailPasswordRequest.expiresAt)
  )
}
