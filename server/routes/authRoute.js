const express = require("express");
const { register, login, logout } = require("../controllers/authController");
// const passport = require("passport");
require("dotenv").config();

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),

//   (req, res) => {
//     res.json({ user: req.user }).redirect(process.env.CLIENT_URL);
//   }
// );

module.exports = router;
