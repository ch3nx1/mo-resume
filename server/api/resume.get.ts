// import Redis from 'ioredis'
// import { getRedisKey } from '../../utils'
// export default defineEventHandler((event) => {
//   const redis = new Redis(process.env.REDIS_URL as string)
//   const { uid } = getQuery(event)
//   const redisKey = getRedisKey(uid as number)
//   return { message: 'hello' + event.node.req.url }
// })
