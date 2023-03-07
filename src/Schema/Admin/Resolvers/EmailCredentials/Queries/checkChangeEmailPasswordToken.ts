import { AUTH_ERRORS } from 'Constants/errors'

import AuthEmailEntity from 'Entities/Auth/Email'

import { CheckEmailPasswordTokenArgs } from 'Schema/Admin/Args/EmailCredentials'

import OkType from 'Schema/Types/Ok'

import { CommonError } from 'Services/Errors'

export default async function checkChangeEmailPasswordToken(
  args: CheckEmailPasswordTokenArgs,
) {
  const request = await AuthEmailEntity.getChangeEmailPasswordRequest(
    args.token,
  )

  if (AuthEmailEntity.isChangeEmailPasswordRequestTokenExpired(request)) {
    await request.destroy()
    throw new CommonError(AUTH_ERRORS.PASSWORD_TOKEN_EXPIRED)
  }

  return OkType.success
}
