import { ApolloServer } from 'apollo-server-koa'
import { execute, subscribe } from 'graphql'
import { Context as GraphQLWSContext } from 'graphql-ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { Context as KoaContext } from 'koa'
import { Server } from 'ws'

import { IS_DEVELOPMENT } from 'Config'

import { User } from 'Models'

import createSchema from 'Schema'

import TokensService from 'Services/Auth/Tokens'
import Context from 'Services/Context'

import formatError from './formatError'

interface ContextParams {
  ctx: KoaContext
}
function context({ ctx }: ContextParams) {
  return new Context({ requestContext: ctx })
}

const apolloServerConfig = {
  context,
  introspection: true,
  tracing: IS_DEVELOPMENT,
  playground: true,
  formatError,
}

const wsServerConfig = {
  execute,
  subscribe,
  context: async (ctx: GraphQLWSContext) => {
    const authHeader = ctx?.connectionParams?.Authorization
    let user = null

    if (typeof authHeader === 'string') {
      const token = authHeader?.replace('Bearer ', '')
      user = await TokensService.getTokenUser(token)
    }

    return new Context({
      wsContext: Object.assign<GraphQLWSContext, { user: User | null }>(ctx, {
        user,
      }),
    })
  },
}

export default async function setupGraphQLServers() {
  const { adminSchema } = await createSchema()

  const adminGraphQLServer = new ApolloServer({
    ...apolloServerConfig,
    schema: adminSchema,
    subscriptions: false,
  })

  const adminSubscriptionServer = new Server({ noServer: true })

  useServer({ ...wsServerConfig, schema: adminSchema }, adminSubscriptionServer)

  return {
    adminSchema,
    adminGraphQLServer,
    adminSubscriptionServer,
  }
}
