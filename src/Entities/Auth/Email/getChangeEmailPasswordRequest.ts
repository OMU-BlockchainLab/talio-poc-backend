import { AUTH_ERRORS } from 'Constants/errors'

import { ChangeEmailPasswordRequest, EmailCredential, User } from 'Models'
import { ChangeEmailPasswordRequestState } from 'Models/ChangeEmailPasswordRequest'
import { EmailCredentialState } from 'Models/EmailCredential'
import { UserState } from 'Models/User'

import { CommonError } from 'Services/Errors'

export default async function getChangeEmailPasswordRequest(
  token: string,
): Promise<ChangeEmailPasswordRequest> {
  const request = await ChangeEmailPasswordRequest.findOne({
    where: { token, state: ChangeEmailPasswordRequestState.pending },
    include: [
      {
        model: EmailCredential,
        as: 'emailCredential',
        where: { state: EmailCredentialState.active },
        include: [
          { model: User, as: 'user', where: { state: UserState.active } },
        ],
      },
    ],
  })

  if (!request) {
    throw new CommonError(AUTH_ERRORS.PASSWORD_TOKEN_INVALID)
  }

  return request
}
