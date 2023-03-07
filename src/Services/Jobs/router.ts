import Router from '@koa/router'
import { router as UI } from 'bull-board'
import express from 'express'

export default function router(path = '/bull') {
  const app = express()

  app.use(path, UI)

  const router = new Router()

  router.prefix(path)

  router.all('(.*)', ctx => {
    if (ctx.status === 404) {
      // @ts-ignore
      delete ctx.res.statusCode
    }

    ctx.respond = false

    app(ctx.req, ctx.res)
  })

  return router
}
