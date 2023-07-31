const client = require("./connectRedis");
const pool = require("../db");

module.exports = {
  handleViewCount: (io) => {
    io.on("connection", (socket) => {
      console.log("socket connected...");
      socket.on("view-count", async (data) => {
        console.log(data);
        socket.join(data.postId);

        const viewCountKey = `posts:${data.postId}:views`;
        const timeoutKey = `posts:${data.postId}:timeout`;

        const timeout = await client.get(timeoutKey);
        if (!timeout || Date.now() - timeout > 30000) {
          await client.incr(viewCountKey);
          await client.set(timeoutKey, Date.now());
          const viewCount = await client.get(viewCountKey);

          console.log(viewCount);

          await pool.query("update posts set viewer = ? where id = ?", [
            viewCount,
            data.postId,
          ]);
        }
      });
    });
  },
};
