const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
// const passport = require("passport");
require("./helpers/connectRedis.js");
const { PORT, CORS_OPTIONS, SOCKET_OPTIONS, CLIENT_URL } = require("./config");
const { routes } = require("./routes");
require("./db");
// require("./controllers/passport.js");
const { Server } = require("socket.io");
const { handleViewCount } = require("./helpers/socketViewer.js");

const app = express();
const port = PORT || 5000;
const httpServer = http.createServer(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(CORS_OPTIONS));

// app.use(passport.initialize());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ROUTES
app.use(routes());
// routes();

// ERROR HANDLERS
app.use((req, res, next) => {
  next(createError.NotFound("This route is not available"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

httpServer.listen(port, () => console.log(`Server is running on port ${port}`));

// VIEW COUNTER
const io = new Server(httpServer, SOCKET_OPTIONS);
handleViewCount(io);
