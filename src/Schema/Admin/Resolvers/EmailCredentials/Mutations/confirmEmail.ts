// eslint-disable-next-line import/no-unresolved
import AuthEntity from 'Entities/Auth'
import AuthEmailEntity from 'Entities/Auth/Email'

import { UserPolicy } from 'Policies'

import { ConfirmEmailArgs } from 'Schema/Admin/Args/EmailCredentials'

import Context from 'Services/Context'

export default async function confirmEmail(
  ctx: Context,
  args: ConfirmEmailArgs,
) {
  await UserPolicy.isUnauthorized(ctx)

  const user = await AuthEmailEntity.confirmEmail(args)

  return AuthEntity.signIn({ user, withRefresh: args.withRefresh, ctx })
}
