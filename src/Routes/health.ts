import Router from '@koa/router'
import { Context as KoaContext, DefaultState } from 'koa'

const healthRouter = new Router<DefaultState, KoaContext>()

/**
 * @api {get} /health AWS Health Checks
 * @apiName Health check
 * @apiGroup System
 */
healthRouter.get('/health', ctx => {
  ctx.body = {}
})

export default healthRouter
