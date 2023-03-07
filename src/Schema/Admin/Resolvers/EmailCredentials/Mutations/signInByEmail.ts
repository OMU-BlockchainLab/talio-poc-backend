import AuthEntity from 'Entities/Auth'

import { UserPolicy } from 'Policies'

import { SignInByEmailArgs } from 'Schema/Admin/Args/EmailCredentials'

import Context from 'Services/Context'

export default async function signInByEmail(
  ctx: Context,
  args: SignInByEmailArgs,
) {
  await UserPolicy.isUnauthorized(ctx)

  const user = await UserPolicy.canSignInByEmail(args)

  return AuthEntity.signIn({ user, withRefresh: args.withRefresh, ctx })
}
