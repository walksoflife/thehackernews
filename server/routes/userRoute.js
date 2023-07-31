const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/userController");
const fileUpload = require("../middleware/fileUpload");

router.get("/:userId", getUser);
router.patch("/:userId", fileUpload.single("avatar"), updateUser);

module.exports = router;
