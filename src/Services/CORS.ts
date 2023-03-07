import cors from '@koa/cors'

import { IS_DEVELOPMENT } from 'Config'

const defaultOrigin = 'https://app.sappchat.com'
const allowedOrigins = new Set([
  'http://localhost:3000',
  'https://app.staging.sappchat.com',
  defaultOrigin,
])

export default cors({
  credentials: true,
  origin(ctx) {
    if (IS_DEVELOPMENT) return '*'
    if (!ctx?.request?.header?.origin) return defaultOrigin

    return allowedOrigins.has(ctx.request.header.origin)
      ? ctx.request.header.origin
      : defaultOrigin
  },
})
