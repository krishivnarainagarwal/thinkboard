import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from "dotenv";
dotenv.config();
const redisConnection= Redis.fromEnv();

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN),
    limiter:Ratelimit.slidingWindow(100, "60 s") // 10 requests per 20 seconds

});

export default ratelimit;