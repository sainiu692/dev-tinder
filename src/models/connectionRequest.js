const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted", "rejected", "ignored", "interested"],
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save",function(next){
  const connectionRequest=this;
  //check if fromUserId is same as toUserId
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("cannot send connection request to yourself!!!!")
  }
  next();
})

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel; 
