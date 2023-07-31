const pool = require("../db");
const createError = require("http-errors");
const uploadToCloudinary = require("../helpers/uploader");
const uuid = require("uuid");
const {
  PAGE_LIMIT,
  POST_LIMIT_TRENDING,
  POST_LIMIT_BREAKING,
} = require("../config");

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      const cat = req.query.cat;
      const page = +req.query.page ? +req.query.page : 0;
      const limit = PAGE_LIMIT || 9;
      const offset = page * limit;

      let q = `SELECT p.id as postId, u.id as authorId, username, title, description, image, avatar, category, p.created_at FROM users u JOIN posts p ON u.id = p.author`;

      if (cat) {
        q += ` where category = ? order by p.created_at DESC limit ${limit} offset ${offset}`;
      } else {
        q += ` order by p.created_at DESC limit ${limit} offset ${offset}`;
      }

      const [data] = await pool.query(q, [cat]);
      if (!data) return next(createError.InternalServerError());

      return res.status(200).json({ message: "Get all posts", posts: data });
    } catch (error) {
      return next(error);
    }
  },

  getSinglePost: async (req, res, next) => {
    try {
      const q =
        "SELECT p.id as postId, u.id as authorId, `username`, `title`, `description`, `image`, `viewer`, `avatar`, `category`, p.created_at FROM users u JOIN posts p ON u.id = p.author WHERE p.id = ? ";

      const [data] = await pool.query(q, [req.params.postId]);
      if (!data) return next(createError.InternalServerError());

      return res
        .status(200)
        .json({ message: "Get single post", post: data[0] });
    } catch (error) {
      return next(error);
    }
  },

  addPost: async (req, res, next) => {
    try {
      const q =
        "INSERT INTO posts(`id`, `title`, `description`, `image`, `category`, `author`) VALUES (?)";

      let imageUrl;
      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file);
      }

      const values = [
        uuid.v4(),
        req.body.title,
        req.body.description,
        imageUrl,
        req.body.category,
        req.user.userId,
      ];

      const [data] = await pool.query(q, [values]);
      if (!data) return next(createError.InternalServerError());

      return res.status(200).json({ message: "Post has been created." });
    } catch (error) {
      return next(error);
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const q = "DELETE FROM posts WHERE `id` = ? AND `author` = ?";
      const values = [postId, req.user.userId];

      const [data] = await pool.query(q, values);

      if (!data)
        return next(createError.BadRequest("You can delete only your post!"));

      return res.status(200).json({ message: "Post has been deleted!" });
    } catch (error) {
      return next(error);
    }
  },

  updatePost: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const q = `UPDATE posts SET title = ?, description=?, image=?, category= ? WHERE id = ? AND author = ?`;

      let imageUrl;
      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file);
      }

      const values = [
        req.body.title,
        req.body.description,
        imageUrl || req.body.image,
        req.body.category,
        postId,
        req.user.userId,
      ];

      await pool.query(q, values);

      return res.status(200).json({ message: "Post has been updated." });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },

  searchPost: async (req, res, next) => {
    try {
      const keyword = req.query.keyword;
      const limit = PAGE_LIMIT || 9;
      // const offset = req.query.page ? (req.query.page - 1) * limit : 0;

      const q = `
          SELECT p.id as postId, u.id as authorId, username, title, description, image, avatar, category, p.created_at FROM users u JOIN posts p ON u.id = p.author WHERE title LIKE ? LIMIT ${limit}
        `;
      const [data] = await pool.query(q, [`%${keyword}%`]);
      if (!data) return next(createError.InternalServerError());

      return res.status(200).json({ message: "Search results", posts: data });
    } catch (error) {
      return next(error);
    }
  },

  getTrendingPost: async (req, res, next) => {
    try {
      const limit = POST_LIMIT_TRENDING || 7;

      const q = `
          SELECT * from posts order by viewer desc limit ${limit}
        `;
      const [data] = await pool.query(q);
      if (data.length < 0) return next(createError.InternalServerError());

      return res.status(200).json({ message: "Trending posts", posts: data });
    } catch (error) {
      return next(error);
    }
  },

  getBreakingNew: async (req, res, next) => {
    try {
      const limit = POST_LIMIT_BREAKING || 4;

      const q = `
          SELECT * from posts order by created_at desc LIMIT ${limit}
        `;
      const [data] = await pool.query(q);
      if (data.length < 0) return next(createError.InternalServerError());

      return res
        .status(200)
        .json({ message: "Breaking news posts", posts: data });
    } catch (error) {
      return next(error);
    }
  },

  bookmarkPost: async (req, res, next) => {
    try {
      const { post } = req.body;
      const [checked] = await pool.query(
        "select * from bookmarks where post = ? and me = ?",
        [post, req.user.userId]
      );

      console.log(checked);

      if (checked[0]?.id) {
        const q = "DELETE FROM bookmarks WHERE `id` = ?";
        const values = [checked[0].id];
        const [data] = await pool.query(q, values);
        if (!data) return next(createError.InternalServerError());
        return res
          .status(200)
          .json({ message: "Post bookmarked has been deleted!" });
      }

      const q = "Insert into bookmarks(`id`, `post`, `me`) values (?)";
      const values = [uuid.v4(), post, req.user.userId];
      const [bookmarked] = await pool.query(q, [values]);
      if (!bookmarked) return next(createError.InternalServerError());
      return res.status(200).json({ message: "Post bookmarked" });
    } catch (error) {
      return next(error);
    }
  },

  getPostBookmarks: async (req, res, next) => {
    try {
      const q =
        "SELECT p.id as postId, u.id as authorId, username, title, description, image, category, p.created_at as postCreated FROM users u JOIN bookmarks b on u.id = b.me JOIN posts p ON p.id = b.post order by postCreated desc";

      const [posts] = await pool.query(q);

      if (posts.length < 0) return next(createError.InternalServerError());

      return res.status(200).json({ message: "Get posts bookmarked", posts });
    } catch (error) {
      return next(error);
    }
  },
};
