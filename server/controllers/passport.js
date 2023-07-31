// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const {
//   GOOGLE_CALLBACK_URL,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_CLIENT_ID,
// } = require("../config");
// const pool = require("../db");
// const createError = require("http-errors");
// const uuid = require("uuid");
// const { signAccessToken } = require("../helpers/jwt");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_CALLBACK_URL,
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       const data = {
//         username: profile.displayName,
//         email: profile.emails[0].value,
//         avatar: profile.photos[0].value,
//       };

//       const q = "select * from users where email = ?";

//       const [existingUser] = await pool.query(q, [data.email]);
//       if (existingUser.length > 0) {
//         console.log("Existing User Google");
//         const { id, username, ...others } = existingUser[0];
//         const token = signAccessToken(existingUser[0].id);
//         return done(null, { id, username, token });
//       }

//       const query =
//         "INSERT INTO users(`id`,`username`,`email`, `avatar`) VALUES (?)";
//       const values = [uuid.v4(), data.username, data.email, data.avatar];

//       const [createdUser] = await pool.query(query, [values]);

//       if (createdUser) {
//         console.log("Saved new User Google");
//         const token = signAccessToken(createdUser.id);
//         const { id, username, ...others } = createdUser;
//         return done(null, { id, username, token });
//       }
//       return createError.InternalServerError();
//     }
//   )
// );
