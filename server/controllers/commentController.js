const pool = require("../db");
const createError = require("http-errors");
const uuid = require("uuid");

module.exports = {
  createComment: async (req, res, next) => {
    try {
      const { content, post, comment_parent } = req.body;
      if (!content || !post)
        return next(createError.BadRequest("Field is required."));

      const query =
        "INSERT INTO comments(`id`,`content`,`post`, `comment_parent`, `author`) VALUES (?)";
      const values = [
        uuid.v4(),
        content,
        post,
        comment_parent,
        req.user.userId,
      ];

      const [cmCreated] = await pool.query(query, [values]);
      if (!cmCreated) return next(createError.InternalServerError());

      return res.status(200).json({ message: "Comment has been created." });
    } catch (error) {
      return next(error);
    }
  },

  getCommentOfPost: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const page = req.query.page || 0;
      const limit = 5;
      const offset = page * limit;
      const q = "SELECT title FROM posts WHERE id = ?";

      const [postFound] = await pool.query(q, [postId]);
      if (postFound.length === 0)
        return next(createError.NotFound("Post does not exist."));

      const query = `Select c.id as commentId, content, post, avatar, author, username, c.created_at as commentCreatedAt, comment_parent from users u inner join comments c on u.id = c.author where post = ? order by c.created_at desc`;

      const [comments] = await pool.query(query, [postId]);

      return res
        .status(200)
        .json({ message: "Get comments of post.", comments });
    } catch (error) {
      return next(error);
    }
  },

  removeComment: async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const q = "SELECT id FROM comments WHERE id = ?";

      const [commentFound] = await pool.query(q, [commentId]);
      if (commentFound.length === 0)
        return next(createError.NotFound("Comment does not exist."));

      const query = "Delete from comments WHERE id = ? and author = ?";

      const [comments] = await pool.query(query, [commentId, req.user.userId]);
      if (!comments)
        return next(
          createError.BadRequest("You can delete only your comment!")
        );

      return res.status(200).json({ message: "Comments deleted." });
    } catch (error) {
      return next(error);
    }
  },

  updateComment: async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const q = "SELECT id FROM comments WHERE id = ?";

      const [commentFound] = await pool.query(q, [commentId]);
      if (commentFound.length === 0)
        return next(createError.NotFound("Comment does not exist."));

      const query =
        "UPDATE comments SET `content`=? WHERE `id` = ? AND `author` = ?";
      const values = [req.body.content, commentId, req.user.userId];

      await pool.query(query, values);

      return res.status(200).json({ message: "Comment has been updated." });
    } catch (error) {
      return next(error);
    }
  },
};
