import { env } from "~/env";
import Redis from "ioredis";

export const redis = new Redis(env.REDIS_URL);

const CACHE_EXPIRY_SECONDS = 60 * 60 * 6; // 6 hours
const CACHE_KEY_SEPARATOR = ":";

export const cacheWithRedis = <Args extends unknown[], R>(
  keyPrefix: string,
  fn: (...args: Args) => Promise<R>,
): ((...args: Args) => Promise<R>) => {
  return (async (...args: Args) => {
    const key = `${keyPrefix}${CACHE_KEY_SEPARATOR}${JSON.stringify(args)}`;
    const cachedResult = await redis.get(key);
    if (cachedResult) {
      console.log(`Cache hit for ${key}`);
      return JSON.parse(cachedResult) as R;
    }

    const result = await fn(...args);
    await redis.set(key, JSON.stringify(result), "EX", CACHE_EXPIRY_SECONDS);
    return result;
  }) as (...args: Args) => Promise<R>;
};
