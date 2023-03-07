import AuthEmailEntity from 'Entities/Auth/Email'

import { UserPolicy } from 'Policies'

import { ChangeEmailPasswordArgs } from 'Schema/Admin/Args/EmailCredentials'

import OkType from 'Schema/Types/Ok'

import Context from 'Services/Context'

export default async function changeEmailPassword(
  ctx: Context,
  args: ChangeEmailPasswordArgs,
) {
  await UserPolicy.isUnauthorized(ctx)

  await AuthEmailEntity.changeEmailPassword(args)

  return OkType.success
}
