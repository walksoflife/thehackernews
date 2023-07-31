const { signAccessToken } = require("../helpers/jwt");
const { hashPw, comparePw } = require("../utils/hashPwd");
const pool = require("../db");
const createError = require("http-errors");
const uuid = require("uuid");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password)
        return next(createError.BadRequest("Field is required."));

      //CHECK EXISTING USER
      const q = "SELECT * FROM users WHERE email = ? OR username = ?";
      const checked = [req.body.email, req.body.username];

      const [userExists] = await pool.query(q, checked);
      if (userExists.length > 0)
        return createError.Conflict("User already exists.");

      //Hash the password and create a user
      const pwHash = hashPw(req.body.password);

      const query =
        "INSERT INTO users(`id`,`username`,`email`,`password`) VALUES (?)";
      const values = [uuid.v4(), req.body.username, req.body.email, pwHash];

      const [useCreated] = await pool.query(query, [values]);
      if (!useCreated) return next(createError.InternalServerError());

      return res.status(200).json({ message: "User has been created." });
    } catch (error) {
      return next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      //CHECK USER
      const q = "SELECT * FROM users WHERE email = ?";

      const [userFound] = await pool.query(q, [req.body.email]);

      if (userFound.length === 0)
        return next(createError.NotFound("User does not exist."));

      //Check password
      const isPasswordCorrect = comparePw(
        req.body.password,
        userFound[0].password
      );

      if (!isPasswordCorrect)
        return next(createError.BadRequest("Wrong email or password!"));

      const token = signAccessToken(userFound[0].id);
      const { id, username, ...other } = userFound[0];

      return res
        .status(200)
        .json({ message: "Login successfully.", user: { id, username, token } });
    } catch (error) {
      return next(error);
    }
  },

  logout: (req, res, next) => {
    try {
      return res.status(200).json({ message: "User has been logged out." });
    } catch (error) {
      return next(error);
    }
  },
};
