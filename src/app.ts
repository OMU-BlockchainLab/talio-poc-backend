import * as Sentry from '@sentry/node'
import Koa from 'koa'
import koaBody from 'koa-body'
import compress from 'koa-compress'
import serve from 'koa-static'
import path from 'path'

import { IS_DEVELOPMENT, IS_PRODUCTION, SECRETS, SENTRY } from 'Config'

import { ApolloPath } from 'Constants/paths'

import authMiddleware from 'Middleware/auth'
import dataLoadersMiddleware from 'Middleware/dataLoaders'
import loggingMiddleware from 'Middleware/logging'

import { createGraphQLRouter, healthRouter, v1Router } from 'Routes'

import CORS from 'Services/CORS'
import setupGraphQLServers from 'Services/GraphQL'
import JobsService from 'Services/Jobs'
import log from 'Services/Log'

export default async function setupApp() {
  const startTime = new Date().toUTCString()

  const isSentryEnabled = IS_PRODUCTION

  await JobsService.initializeQueues()

  const {
    adminSchema,
    adminGraphQLServer,
    adminSubscriptionServer,
  } = await setupGraphQLServers()

  const app = new Koa()

  app.use(serve(path.resolve(__dirname, '..', 'static')))

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      err.status = err.code || err.statusCode || err.status || 500
      ctx.body = {
        ok: false,
        message: err.message,
      }
    }
  })

  if (isSentryEnabled) {
    Sentry.init({ dsn: SENTRY.DSN })
  }

  app.keys = [SECRETS.SESSION]

  app.use(healthRouter.routes())

  app.use(CORS)

  app.use(compress())

  app.use(koaBody({ multipart: true, includeUnparsed: true }))

  app.use(loggingMiddleware)

  app.use(async (ctx, next) => {
    ctx.set('x-app-start-time', startTime)
    await next()
  })

  app.use(dataLoadersMiddleware)
  app.use(authMiddleware)
  app.use(createGraphQLRouter({ adminSchema }).routes())

  app.use(adminGraphQLServer.getMiddleware({ path: ApolloPath.Admin }))

  app.use(v1Router().routes())

  // if (IS_DEVELOPMENT) {
  app.use(JobsService.router().routes())
  // }

  app.on('error', err => {
    log.error(err)

    if (isSentryEnabled) {
      Sentry.captureException(err)
    }
  })

  return {
    app,
    adminGraphQLServer,
    adminSubscriptionServer,
  }
}
