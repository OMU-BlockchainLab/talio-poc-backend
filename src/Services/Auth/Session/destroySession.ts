import { TokenKind } from 'Constants/auth'

import redis from 'Services/Redis'

import getKey from './getKey'

interface DestroySessionParams {
  kind: TokenKind
  key: string
}
export default async function destroySession(params: DestroySessionParams) {
  const redisKey = getKey(params.kind, params.key)
  await redis.del(redisKey)
}
