import { RedisPubSub } from 'graphql-redis-subscriptions'
import IORedis from 'ioredis'

import { IS_TEST, REDIS } from 'Config'

const pubSubRedisClient = new IORedis(REDIS.PORT, REDIS.HOST, {
  db: IS_TEST ? 5 : 2,
})

const pubSub = new RedisPubSub({
  publisher: pubSubRedisClient,
  subscriber: pubSubRedisClient.duplicate(),
})

export default pubSub
