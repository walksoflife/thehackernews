const pool = require("../db");
const createError = require("http-errors");
const uploadToCloudinary = require("../helpers/uploader");

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const q =
        "SELECT u.id as userId, username, quote, avatar, bio, location, u.created_at as joinDate, count(p.id) as posts from users u join posts p on u.id = p.author WHERE u.id = ? ";

      const [data] = await pool.query(q, [req.params.userId]);

      if (!data) return next(createError.InternalServerError());

      return res
        .status(200)
        .json({ message: "Get user profile", user: data[0] });
    } catch (error) {
      return next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const q =
        "UPDATE users SET `username`=?,`quote`=?,`avatar`=?,`bio`=?, `location`=? WHERE `id` = ?";

      let avatarUrl;
      if (req.file) {
        avatarUrl = await uploadToCloudinary(req.file);
      }

      const values = [
        req.body.username,
        req.body.quote,
        avatarUrl || req.body.avatar,
        req.body.bio,
        req.body.location,
        req.params.userId,
      ];

      await pool.query(q, values);

      return res.status(200).json({ message: "User has been updated." });
    } catch (error) {
      return next(error);
    }
  },
};
