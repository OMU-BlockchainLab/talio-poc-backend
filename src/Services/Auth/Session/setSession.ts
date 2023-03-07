import { TokenKind } from 'Constants/auth'

import redis from 'Services/Redis'

import getKey from './getKey'

interface SetSessionParams {
  kind: TokenKind
  key: string
  userId: string
  lifetime: number
}
export default async function setSession(params: SetSessionParams) {
  const redisKey = getKey(params.kind, params.key)
  await redis.set(redisKey, params.userId, 'EX', params.lifetime / 1000)
}
