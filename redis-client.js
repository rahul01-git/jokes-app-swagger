const { createClient } = require("redis");
require("dotenv/config");

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || "localhost"}:${
    process.env.REDIS_PORT || 6379
  }`,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

module.exports = { redisClient };
