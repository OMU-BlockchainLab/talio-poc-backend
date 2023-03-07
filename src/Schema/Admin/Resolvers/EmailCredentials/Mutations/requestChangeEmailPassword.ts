import { AUTH_ERRORS } from 'Constants/errors'

import AuthEmailEntity from 'Entities/Auth/Email'

import EmailCredential, { EmailCredentialState } from 'Models/EmailCredential'

import { RequestChangeEmailPasswordArgs } from 'Schema/Admin/Args/EmailCredentials'

import OkType from 'Schema/Types/Ok'

import { CommonError } from 'Services/Errors'

export default async function requestChangeEmailPassword(
  args: RequestChangeEmailPasswordArgs,
) {
  const emailCredential = await EmailCredential.findOne({
    where: { email: args.email, state: EmailCredentialState.active },
  })

  if (!emailCredential) {
    throw new CommonError(AUTH_ERRORS.EMAIL_NOT_FOUND)
  }

  await AuthEmailEntity.createChangeEmailPasswordRequest({ emailCredential })

  return OkType.success
}
