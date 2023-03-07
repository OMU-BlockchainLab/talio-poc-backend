import IORedis from 'ioredis'
import ms from 'ms'

import { IS_TEST, REDIS } from 'Config'

import log from 'Services/Log'

const redisClient = new IORedis(REDIS.PORT, REDIS.HOST, { db: IS_TEST ? 3 : 0 })

redisClient.on('error', log.error)

export async function persistToCache(key: string, value: any) {
  try {
    await redisClient.set(key, JSON.stringify(value), 'EX', ms('6h') / 1000)
  } catch (error) {
    log.error(error.message)
  }
}

export async function readOrPersist<T>(
  key: string,
  getterPromise: () => Promise<T>,
): Promise<T | null> {
  try {
    const result = await redisClient.get(key)

    if (!result) {
      const resultFromGetter = await getterPromise()
      await persistToCache(key, resultFromGetter)
      return resultFromGetter
    }

    return JSON.parse(result)
  } catch (error: any) {
    log.error(error.message)
    return null
  }
}

export default redisClient
