const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

app.use(
  cors({
    origin: "https://devtinder-web-zo9w.onrender.com", // or your port       here we give frontend url
    // origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { requestRouter } = require("./routes/requests.js");
const { userRouter } = require("./routes/user.js");
const { initializeSocket } = require("./utils/socket.js");
const  chatRouter  = require("./routes/chat.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);


connectDB()
  .then(() => {
    console.log("DB connected successfully");
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });
