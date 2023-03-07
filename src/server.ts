import setupApp from 'app'
import http from 'http'
import httpShutdown from 'http-shutdown'

import { PORT } from 'Config'

import { ApolloPath } from 'Constants/paths'

import db from 'Services/Db'
import log from 'Services/Log'
import redis from 'Services/Redis'

import installSubscriptionHandlers from 'Utils/subscriptions'

const port = parseInt(PORT, 10)

const startServer = async () => {
  const { app, adminSubscriptionServer } = await setupApp()

  const server = httpShutdown(http.createServer(app.callback()))

  server.on(
    'upgrade',
    installSubscriptionHandlers({
      adminSubscriptionServer
    }),
  )

  server.listen(port, () => {
    log.info(`🚀 Apollo initialized:`)
    log.info(
      `   – Public server is ready at http://localhost:${PORT}${ApolloPath.Public}`,
    )
    log.info(
      `   – Public subscriptions server is ready at ws://localhost:${PORT}${ApolloPath.Public}`,
    )
    log.info(
      `   – Admin server is ready at http://localhost:${PORT}${ApolloPath.Admin}`,
    )
    log.info(
      `   – Admin subscriptions server is ready at ws://localhost:${PORT}${ApolloPath.Admin}`,
    )
  })

  const shutdown = () => {
    server.shutdown(async () => {
      await db.close()
      await redis.disconnect()
      log.info(`Server is stopped`)
      process.exit(0)
    })
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

startServer()

const logErrorAndExit = (error: Error) => {
  log.error(error)
  process.exit(75)
}

process.on('uncaughtException', logErrorAndExit)
// Apparently, typescript doesn't know what is unhandledRejection
process.on('unhandledRejection' as any, logErrorAndExit) // eslint-ignore-line @typescript-eslint/no-explicit-any
