const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

// get all the pending connection request for the loggedInUser

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  try {
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
        "fromUserId",
        "firstName lastName age gender"
    )

    // .populate("fromUserId",["firstName","lastName"])

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = { userRouter };
