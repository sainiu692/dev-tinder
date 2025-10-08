const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  // creating a new instance of a user model
  const user = new User({
    firstName: "Virat",
    lastName: "kohli",
    email: "viru@gmail.com",
    password: "12345",
    age: "22",
    gender: "male",
  });
  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user: " + err.message);
  }
});

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
