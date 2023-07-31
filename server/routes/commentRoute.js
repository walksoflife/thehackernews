const express = require("express");
const router = express.Router();
const {
  getCommentOfPost,
  createComment,
  removeComment,
  updateComment,
} = require("../controllers/commentController");

router.get("/:postId", getCommentOfPost);
router.post("/", createComment);
router.delete("/:commentId", removeComment);
router.patch("/:commentId", updateComment);

module.exports = router;
