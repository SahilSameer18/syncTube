const roomSocket = require("./roomSocket");
const chatSocket = require("./chatSocket");

// This is the main socket entry point.
// Every time a client connects, wire up the room and chat handlers for that socket.
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    // Room events: join, leave, play, pause, seek, change video, roles, etc.
    roomSocket(io, socket);

    // Chat events: sending and receiving messages
    chatSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("disconnected:", socket.id);
    });
  });
};
