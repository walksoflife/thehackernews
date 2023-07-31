const express = require("express");
const router = express.Router();
const {
  getPosts,
  getSinglePost,
  addPost,
  deletePost,
  updatePost,
  searchPost,
  getTrendingPost,
  getBreakingNew,
  getPostBookmarks,
  bookmarkPost,
} = require("../controllers/postController");
const fileUpload = require("../middleware/fileUpload");

router.get("/", getPosts);
router.get("/search", searchPost);
router.get("/trending", getTrendingPost);
router.get("/breaking", getBreakingNew);
router.get("/bookmark", getPostBookmarks);
router.put("/bookmark", bookmarkPost);
router.get("/:postId", getSinglePost);
router.post("/", fileUpload.single("image"), addPost);
router.delete("/:postId", deletePost);
router.patch("/:postId", fileUpload.single("image"), updatePost);

module.exports = router;
