import { AUTH_ERRORS } from 'Constants/errors'

import EmailCredential, { EmailCredentialState } from 'Models/EmailCredential'
import User, { UserState } from 'Models/User'

import { CommonError } from 'Services/Errors'
import { comparePassword } from 'Services/Password'

export default async function canSignInByEmail({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const emailCredential = await EmailCredential.scope('withPassword').findOne({
    where: { email },
    include: [{ model: User, as: 'user', where: { state: UserState.active } }],
  })

  if (!emailCredential) {
    throw new CommonError(AUTH_ERRORS.INCORRECT_EMAIL_OR_PASSWORD)
  }

  if (!emailCredential.passwordDigest) {
    throw new CommonError(AUTH_ERRORS.INCORRECT_EMAIL_OR_PASSWORD)
  }

  const isPasswordMatch = await comparePassword(
    password,
    emailCredential.passwordDigest,
  )

  if (!isPasswordMatch) {
    throw new CommonError(AUTH_ERRORS.INCORRECT_EMAIL_OR_PASSWORD)
  }

  if (emailCredential.state !== EmailCredentialState.active) {
    throw new CommonError(AUTH_ERRORS.EMAIL_NOT_VERIFIED)
  }

  if (!emailCredential.isPrimary) {
    throw new CommonError(AUTH_ERRORS.EMAIL_NOT_PRIMARY)
  }

  return emailCredential.user
}
