const redis = require("redis");

let client;

const getClient = async () => {
  if (client) return client;

  client = redis.createClient();
  client.on("error", (error) => {
    console.error(`Redis Error : ${error}`);
  });
  await client.connect();
  return client;
};

module.exports = getClient;
