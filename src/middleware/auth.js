
const jwt=require("jsonwebtoken");
const User = require("../models/user");

  // 1. Get token from cookies
  // 2. Verify token is valid
  // 3. Extract user ID from token
  // 4. Find user in database
  // 5. Attach user to request object
  // 6. Call next() to continue to the actual route



const userAuth = async (req, res, next) => {
  try {
    // getting token from cookies

    const { token } = req.cookies;
    if (!token) {
      // throw new Error("Invalid token or no token present");
      return res.status(401).send("Please Login!!")
    }
    // validate my token
    const decodedObj = await jwt.verify(token, "DEV@TINDER692");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = { userAuth };