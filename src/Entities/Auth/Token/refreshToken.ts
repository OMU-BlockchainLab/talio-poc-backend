import { TokenKind } from 'Constants/auth'
import { AUTH_ERRORS } from 'Constants/errors'

import { AuthToken } from 'Models'
import User, { UserState } from 'Models/User'

import SessionService from 'Services/Auth/Session'
import TokensService from 'Services/Auth/Tokens'
import Context from 'Services/Context'
import { UnauthorizedError } from 'Services/Errors'
import { verifyJWT } from 'Services/JWT'

import getOrigin from 'Utils/getOrigin'

export default async function refreshToken({
  token,
  ctx,
}: {
  token: string
  ctx: Context
}) {
  const payload = await verifyJWT(token)

  const userId = payload?.sub
  const key = payload?.key

  if (!userId || !key) {
    throw new UnauthorizedError(AUTH_ERRORS.INVALID_TOKEN)
  }

  const sessionUserId = await SessionService.get({
    kind: TokenKind.refresh,
    key,
  })

  if (userId !== sessionUserId) {
    throw new UnauthorizedError(AUTH_ERRORS.INVALID_TOKEN)
  }

  const authToken = await AuthToken.findOne({
    where: { refreshKey: key },
    include: [
      {
        model: User,
        as: 'user',
        where: { state: UserState.active, id: userId },
      },
    ],
  })

  if (!authToken) {
    throw new UnauthorizedError(AUTH_ERRORS.INVALID_TOKEN)
  }

  const { user } = authToken

  await SessionService.destroy({
    kind: TokenKind.access,
    key: authToken.accessKey,
  })

  const accessToken = await TokensService.createToken(TokenKind.access, user)

  await authToken.update({
    accessKey: accessToken?.key,
    accessExpiresAt: accessToken?.expiresAt,
    origin: getOrigin(ctx),
  })

  return accessToken.token
}
