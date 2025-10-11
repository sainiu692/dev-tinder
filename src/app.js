const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    //encrypt the password
    const { firstName, lastName, email, password, skills } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    console.log(passwordHash);

    // creating a new instance of a user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      skills,
    });
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("invalid credentials!!!!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // create a jwt token
      const token = jwt.sign({ _id: user._id }, "DEV@TINDER692",{
        expiresIn: "1d",
      });
      console.log(token);

      //add the token to cookie and send the response back to user
      res.cookie("token", token,{
        expires: new Date(Date.now() + 8*360000),
      });
      res.send("User logged in successfully");
    } else {
      throw new Error("invalid credentials!!!!");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// get Profile API
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " " + " sent connection request");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.findOne({ email: userEmail });
    if (!users) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    // why the if block response not sending as findOne returns a single object not an array an hence length is undefined
    // and we doing undefined.length===0 which gives error and it is directly moving to catch block
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

// Feed API -GET/feed -get all users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    // await User.findByIdAndDelete({_id:userId});
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

// update  data of user
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;

    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!!!");
    }
    if (data?.age < 18) {
      throw new Error("Age must be at least 18");
    }
    if (data?.age > 120) {
      throw new Error("Age must be less than 120");
    }
    if (data?.skills?.length > 10) {
      throw new Error("Skills should not be more than 10");
    }
    if (data?.about?.trim()?.length === 0) {
      throw new Error("About cannot be empty");
    }
    if (data?.about?.length > 500) {
      throw new Error("about should not be more than 500 characters");
    }

    // const user = await User.findByIdAndUpdate({ _id: userId }, data);
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
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
