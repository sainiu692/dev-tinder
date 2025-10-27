const express = require("express");
const app = express();

const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // or your port
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { requestRouter } = require("./routes/requests.js");
const { userRouter } = require("./routes/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });
