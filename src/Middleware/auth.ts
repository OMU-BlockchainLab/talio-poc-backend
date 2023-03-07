import { Next, ParameterizedContext } from 'koa'

import TokensService from 'Services/Auth/Tokens'

export default async function authMiddleware(
  ctx: ParameterizedContext,
  next: Next,
) {
  const authHeader = ctx?.request?.header?.authorization

  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')

    ctx.user = await TokensService.getTokenUser(token)
  }

  return next()
}
