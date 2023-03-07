import Router from '@koa/router'
import { Context as KoaContext, DefaultState } from 'koa'

import { BUILD } from 'Config'

const publicRouter = new Router<DefaultState, KoaContext>()

/**
 * @api {get} /v1/public Common information
 * @apiGroup Public
 *
 * @apiSuccess {String} api Api version
 * @apiSuccess {String} build Build number
 */
publicRouter.get('/', ctx => {
  ctx.body = { api: 'v1', build: BUILD }
})

export default publicRouter
