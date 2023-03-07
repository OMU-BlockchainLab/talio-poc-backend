import { Next, ParameterizedContext } from 'koa'

import get from 'lodash/get'

import log from 'Services/Log'

const hideSensitiveData = (json: string) =>
  json.replace(/("?(?:token|password)"?\s*):(\s*")[^"]+(")/g, '$1:$2******$3')

export default async function loggingMiddleware(
  ctx: ParameterizedContext,
  next: Next,
) {
  const startTime = Date.now()

  const isGraphQL = ctx.method === 'POST' && ctx.originalUrl === '/graphql'

  const duration = () => {
    const delta = Date.now() - startTime
    return `${delta}ms`
  }

  const logGraphQL = () => {
    const body = ctx?.request?.body || {}

    const operationName = body?.operationName

    if (operationName === 'IntrospectionQuery') {
      return
    }

    let query: string = body?.query || ''
    query = query
      .replace(/__typename/, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    query = hideSensitiveData(query)

    const variables = ctx?.request?.body?.variables || {}
    let variablesStr = JSON.stringify(variables)
    variablesStr = hideSensitiveData(variablesStr)

    let responseBody

    try {
      responseBody = JSON.parse(`${ctx?.response?.body}`)
    } catch (error) {
      responseBody = {}
    }

    const responseStatus =
      get(responseBody, ['errors', 0, 'extensions', 'code']) ||
      ctx?.response?.status ||
      500

    const userId = ctx?.user?.id || ''
    const role = ctx?.user?.role || ''

    const userInfo = `${role || 'no_role'}(${userId})`

    log.info(
      `GraphQL: ${duration()} ${responseStatus} ${userInfo} ${query} ${variablesStr}`,
    )
  }

  try {
    await next()
  } catch (error) {
    if (isGraphQL) logGraphQL()
    throw error
  }

  // log when the response is finished or closed,
  // whichever happens first. (got from koa-logger)
  const { res } = ctx

  const onfinish = done.bind(null, 'finish') // eslint-disable-line
  const onclose = done.bind(null, 'close') // eslint-disable-line

  function done() {
    res.removeListener('finish', onfinish)
    res.removeListener('close', onclose)
    if (isGraphQL) logGraphQL()
  }

  res.once('finish', onfinish)
  res.once('close', onclose)
}
