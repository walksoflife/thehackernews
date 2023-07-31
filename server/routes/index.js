const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute");
const postRoute = require("./postRoute");
const userRoute = require("./userRoute");
const commentRoute = require("./commentRoute");
const { verifyAccessToken } = require("../helpers/jwt");

module.exports = {
  routes: () => {
    router.use("/api/auth", authRoute);
    router.use(verifyAccessToken);
    router.use("/api/posts", postRoute);
    router.use("/api/users", userRoute);
    router.use("/api/comments", commentRoute);

    return router;
  },
};
