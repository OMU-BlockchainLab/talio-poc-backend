import { TokenKind } from 'Constants/auth'

import redis from 'Services/Redis'

import getKey from './getKey'

interface GetSessionParams {
  kind: TokenKind
  key: string
}
export default async function getSession(params: GetSessionParams) {
  const redisKey = getKey(params.kind, params.key)
  const sessionUserId = await redis.get(redisKey)
  return sessionUserId || null
}
