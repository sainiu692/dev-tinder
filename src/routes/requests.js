const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/send/request/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(404)
          .json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!!!!" });
      }

      // const existingConnectionRequest = await ConnectionRequest.findOne({
      //   $or: [
      //     { fromUserId, toUserId },
      //     { fromUserId: toUserId, toUserId: fromUserId },
      //   ],
      // });
      // if (existingConnectionRequest) {
      //   return res
      //     .status(400)
      //     .json({ message: "Connection Request already exists" });
      // }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId, status: { $in: ["interested", "ignored"] } },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
            status: { $in: ["interested", "ignored"] },
          },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: `A ${existingConnectionRequest.status} connection request already exists`,
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + " " + status + " in " + toUser.firstName + " ",
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = {
  requestRouter,
};
