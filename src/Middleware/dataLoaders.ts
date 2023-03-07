import { Next, ParameterizedContext } from 'koa'

import createDataLoaders from 'DataLoaders'

export default function dataLoadersMiddleware(
  ctx: ParameterizedContext,
  next: Next,
) {
  ctx.dataLoaders = createDataLoaders()

  return next()
}
