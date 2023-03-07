import Router from '@koa/router'
import { GraphQLSchema, printSchema } from 'graphql'
import { Context as KoaContext, DefaultState } from 'koa'

import { ApolloPath } from 'Constants/paths'

interface Schemas {
  adminSchema: GraphQLSchema
}

export default ({ adminSchema }: Schemas) => {
  const router = new Router<DefaultState, KoaContext>()

  router.get(`${ApolloPath.Admin}/schema`, ctx => {
    ctx.body = printSchema(adminSchema)
  })

  return router
}
