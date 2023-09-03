import { Redis } from "ioredis"

console.log({
  port: process.env.REDIS_PORT!,
  host: process.env.REDIS_HOST!,
  password: process.env.REDIS_SECRET!,
  db: process.env.REDIS_DB!,
})

// @ts-ignore
export const redis = new Redis({
  port: process.env.REDIS_PORT!,
  host: process.env.REDIS_HOST!,
  password: process.env.REDIS_SECRET!,
  db: process.env.REDIS_DB!,
})

