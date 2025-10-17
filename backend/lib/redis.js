import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_URL;

// Corrected initialization with TLS configuration for Upstash (rediss://)
export const redis = new Redis(redisUrl, {
    tls: { 
        // This is crucial for cloud-hosted Redis services requiring SSL/TLS
        rejectUnauthorized: false 
    }
});

// Optional but recommended for debugging:
redis.on('connect', () => {
    console.log('Successfully connected to Upstash Redis!');
});

redis.on('error', (err) => {
    console.error('Redis Connection Error:', err); 
});