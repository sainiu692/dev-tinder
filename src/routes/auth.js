const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    //encrypt the password
    const { firstName, lastName, emailId, password, age, gender, skills } =
      req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    // console.log(passwordHash);

    // creating a new instance of a user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 360000),
    });
    res.json({ message: "User signed up successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email address");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials!!!!");
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create a jwt token
      // const token = jwt.sign({ _id: user._id }, "DEV@TINDER692",{
      //   expiresIn: "1d",
      // });
      const token = await user.getJWT();
      console.log(token);

      //add the token to cookie and send the response back to user
      res.cookie("token", token, {
        // httpOnly: true,
        // secure: true, // Required for HTTPS
        // sameSite: "none", // Required for cross-origin
        expires: new Date(Date.now() + 8 * 360000),
      });
      res.send(user);
    } else {
      throw new Error("invalid credentials!!!!");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User logged out successfully");
});

module.exports = {
  authRouter,
};
