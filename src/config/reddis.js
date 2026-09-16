import { createClient } from 'redis';

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWARD,
    socket: {
        host: "turbovivid-eclectic-capacious-84709.db.redis.io",
        port: 13451
    }
});



export default redisClient
