const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRESIN } = require("../config");

module.exports = {
  signAccessToken: (userId) => {
    const payload = { userId };

    const token = JWT.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRESIN,
    });

    return token;
  },

  verifyAccessToken: (req, res, next) => {
    try {
      if (!req.headers["authorization"]) throw createError.Unauthorized();
      const authHeader = req.headers["authorization"];
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];

      JWT.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return next(createError.Unauthorized(err.message));

        req.user = decoded;
        next();
      });
    } catch (error) {
      console.log(error);
    }
  },
};

// export const signRefreshToken = (userId) =>
//   new Promise((resolve, reject) => {
//     const payload = { userId };
//     const secret = REFRESH_TOKEN_SECRET;
//     const options = {
//       expiresIn: REFRESH_TOKEN_EXPIRESIN,
//     };

//     JWT.sign(payload, secret, options, (err, token) => {
//       if (err) {
//         console.log(err.message);
//         reject(createError.InternalServerError());
//       }
//       client.set(userId, token, "EX", 365 * 24 * 60 * 60, (err, reply) => {
//         if (err) {
//           console.log(err.message);
//           reject(createError.InternalServerError());
//           return;
//         }
//         resolve(token);
//       });
//     });
//   });

// export const verifyRefreshToken = (refreshToken) =>
//   new Promise((resolve, reject) => {
//     JWT.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
//       if (err) return reject(createError.Unauthorized());
//       if (err) return reject("Loi err: " + err);
//       const userId = payload.userId;

//       client.get(userId, (err, result) => {
//         if (err) {
//           console.log(err.message);
//           return;
//         }
//         if (refreshToken === result) return resolve("kq: " + userId);
//         reject(createError.Unauthorized());
//       });
//     });
//   });
