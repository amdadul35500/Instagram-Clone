const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const uploadRouter = require("./routers/uploadRouter");
const postRouter = require("./routers/postRouter");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const conversationRouter = require("./routers/conversation");
const messageRouter = require("./routers/messages");
const server = http.createServer(app);

// socket
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
console.log("commmmmm");
io.on("connection", (socket) => {
  console.log("socket.io is connected");

  socket.on("disconnect", () => {
    console.log("socket.io is disconnect");
  });
});

global.io = io;

dotenv.config();
const PORT = process.env.PORT || 8800;

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  "/profilePicture",
  express.static(path.join(__dirname, "public/profilePicture"))
);
//app.use(express.static("public/images"));
app.use(cookieParser(process.env.COOKIE_SECRET));

// database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongdb");
  })
  .catch((err) => {
    console.log(err);
  });

// routing sutup
app.use("/api", uploadRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

// not foundHandler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

server.listen(PORT, () => {
  console.log("Server is Running");
});
