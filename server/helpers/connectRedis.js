const { Redis } = require("ioredis");
require("dotenv").config();
const { REDIS_OPTIONS } = require("../config");

const client = new Redis(REDIS_OPTIONS);

client.set("io", "mk");

client.get("io", (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});

client.on("connect", () => {
  console.log("Client connected to redis...");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use...");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
