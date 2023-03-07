import AuthEmailEntity from 'Entities/Auth/Email'

import { CheckEmailConfirmationTokenArgs } from 'Schema/Admin/Args/EmailCredentials'

import OkType from 'Schema/Types/Ok'

export default async function checkEmailConfirmationToken(
  args: CheckEmailConfirmationTokenArgs,
) {
  await AuthEmailEntity.checkEmailConfirmationToken(args.token)

  return OkType.success
}
