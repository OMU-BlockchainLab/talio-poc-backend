import Router from '@koa/router'
import { Context as KoaContext, DefaultState } from 'koa'

import AuthTokenEntity from 'Entities/Auth/Token'

import Context from 'Services/Context'

const authRouter = new Router<DefaultState, KoaContext>()

/**
 * @api {get} /v1/auth/refresh-token Refresh accessToken
 * @apiGroup Auth
 *
 * @apiParam refreshToken Refresh token
 *
 * @apiSuccess {Boolean} ok True if all goes fine
 * @apiSuccess {String} refreshed New access token
 *
 * @apiError {Boolean} ok False if something wrong
 * @apiError {String} error Error message
 */
authRouter.get('/refresh-token', async ctx => {
  const queryToken = ctx.request.query?.refreshToken || ''
  const token = Array.isArray(queryToken) ? queryToken[0] : queryToken

  try {
    const refreshed = await AuthTokenEntity.refreshToken({
      token,
      ctx: new Context({ requestContext: ctx }),
    })

    ctx.body = { ok: true, refreshed }
  } catch (error) {
    ctx.body = { ok: false, error: error.message }
  }
})

export default authRouter
