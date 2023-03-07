import { AUTH_ERRORS } from 'Constants/errors'

import EmailConfirmationRequest, {
  EmailConfirmationRequestState,
} from 'Models/EmailConfirmationRequest'
import EmailCredential from 'Models/EmailCredential'
import User, { UserState } from 'Models/User'

import { CommonError } from 'Services/Errors'

export default async function getEmailConfirmationRequest(token: string) {
  const request = await EmailConfirmationRequest.findOne({
    where: { token, state: EmailConfirmationRequestState.pending },
    include: [
      {
        model: EmailCredential,
        as: 'emailCredential',
        include: [
          { model: User, as: 'user', where: { state: UserState.active } },
        ],
      },
    ],
  })

  if (!request) {
    throw new CommonError(AUTH_ERRORS.CONFIRMATION_TOKEN_INVALID)
  }

  return request
}
