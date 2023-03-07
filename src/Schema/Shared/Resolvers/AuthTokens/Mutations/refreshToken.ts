import AuthTokenEntity from 'Entities/Auth/Token'

import { RefreshTokenArgs } from 'Schema/Shared/Args/AuthTokens'

import Context from 'Services/Context'

export default async function refreshToken(
  ctx: Context,
  args: RefreshTokenArgs,
) {
  const accessToken = await AuthTokenEntity.refreshToken({
    token: args.token,
    ctx,
  })

  return { accessToken }
}
