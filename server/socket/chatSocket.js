const rooms = require("../utils/roomStore");

// Handles all chat messages inside a room.
// Anyone in the room can send a message.
module.exports = (io, socket) => {
  socket.on("chat_message", ({ message }) => {
    const { roomId, username } = socket.data;
    if (!roomId || !message?.trim()) return;

    // Broadcast the message to everyone in the room (including the sender)
    io.to(roomId).emit("chat_message", {
      userId: socket.id,
      username,
      message: message.trim(),
      timestamp: Date.now(),
    });
  });
};



