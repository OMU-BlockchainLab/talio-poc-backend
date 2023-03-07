import { TokenKind } from 'Constants/auth'

import { AuthToken, User } from 'Models'

import TokensService from 'Services/Auth/Tokens'
import Context from 'Services/Context'
import { doInTransaction, Transaction } from 'Services/Db'
import { UnauthorizedError } from 'Services/Errors'

import getOrigin from 'Utils/getOrigin'

export default async function signIn({
  user,
  withRefresh,
  ctx,
  transaction: tx,
}: {
  user: User
  withRefresh?: boolean
  ctx?: Context
  transaction?: Transaction
}) {
  const { accessToken, refreshToken } = await doInTransaction(
    async transaction => {
      if (!user) throw new UnauthorizedError()

      const accessToken = await TokensService.createToken(
        TokenKind.access,
        user,
      )

      let refreshToken

      if (withRefresh) {
        refreshToken = await TokensService.createToken(TokenKind.refresh, user)
      }

      await AuthToken.create(
        {
          userId: user.id,
          origin: ctx ? getOrigin(ctx) : '',

          accessKey: accessToken?.key,
          accessExpiresAt: accessToken?.expiresAt,

          refreshKey: refreshToken?.key,
          refreshExpiresAt: refreshToken?.expiresAt,
        },
        { transaction },
      )

      await user.update({ lastLoginAt: new Date() }, { transaction })

      return { accessToken, refreshToken }
    },
    tx,
  )

  return {
    accessToken: accessToken?.token,
    refreshToken: refreshToken?.token,
  }
}
