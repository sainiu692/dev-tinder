const socket = require("socket.io");
const  Chat  = require("../models/chat");

const initializeSocket = (server) => {
  const io = new socket.Server(server, {
    cors: {
      // origin: "http://localhost:5173",
      origin: "https://devtinder-web-zo9w.onrender.com",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    //handle socket events here
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(firstName + " Joined room:", roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName,lastName, userId, targetUserId, text }) => {
        //save message to db
        try {
          const roomId = [userId, targetUserId].sort().join("_");
          console.log("Message from " + firstName + ":" + " " + text);
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({ senderId: userId, text });
          await chat.save();
          io.to(roomId).emit("message received", { firstName,lastName, text });
        } catch (err) {
          console.log("Error saving message to DB", err);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};
module.exports = { initializeSocket };
