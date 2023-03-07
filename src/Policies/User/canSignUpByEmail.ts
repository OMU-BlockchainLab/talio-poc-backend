import { AUTH_ERRORS } from 'Constants/errors'

import EmailCredential, { EmailCredentialState } from 'Models/EmailCredential'

import { CommonError } from 'Services/Errors'

export default async function canSignUpByEmail({ email }: { email: string }) {
  const activeEmailCredential = await EmailCredential.findOne({
    where: { email, state: EmailCredentialState.active },
  })

  if (activeEmailCredential) {
    throw new CommonError(AUTH_ERRORS.USER_ALREADY_EXISTS)
  }

  return true
}
