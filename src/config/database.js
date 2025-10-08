const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sainiu692:5HGQvUoHNEzS16Lt@namaste-node.jkezkna.mongodb.net/"
  );
};

module.exports= {connectDB};
