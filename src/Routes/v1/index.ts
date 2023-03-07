import Router from '@koa/router'
import { Context as KoaContext, DefaultState } from 'koa'

import authRouter from './auth'
import privateRouter from './private'
import publicRouter from './public'

export default function v1Router() {
  const router = new Router<DefaultState, KoaContext>({
    prefix: '/v1',
  })

  router.use('/', publicRouter.routes())
  router.use('/auth', authRouter.routes())
  router.use('/private', privateRouter.routes())

  return router
}
