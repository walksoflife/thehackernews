require("dotenv").config();

const DB_OPTIONS = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

const CLOUDINARY_OPTIONS = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};

const REDIS_OPTIONS = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PW,
};

const CORS_OPTIONS = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const SESSION_OPTIONS = {
  name: "sid",
  secret: "sdfasdf",
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  saveUninitialized: false,
};

const SOCKET_OPTIONS = {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL,
  },
};

module.exports = {
  PORT: process.env.PORT,
  DB_OPTIONS,
  CORS_OPTIONS,
  CLOUDINARY_OPTIONS,
  REDIS_OPTIONS,
  SESSION_OPTIONS,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRESIN: process.env.ACCESS_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_EXPIRESIN: process.env.REFRESH_TOKEN_EXPIRESIN,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  SOCKET_OPTIONS,
  PAGE_LIMIT: process.env.PAGE_LIMIT,
  POST_LIMIT_BREAKING: process.env.POST_LIMIT_BREAKING,
  POST_LIMIT_TRENDING: process.env.POST_LIMIT_TRENDING,
  CLIENT_URL: process.env.CLIENT_URL,
};
