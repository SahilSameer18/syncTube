require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socketHandler = require("./socket");

const app = express();

// We need a raw HTTP server so Socket.IO and Express can share the same port
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
// cors here allows the React client to connect via WebSocket
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:5173" },
});

// Standard Express middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Basic health-check route
app.get("/", (req, res) => res.json({ message: "SyncTube server is running" }));

// Register all socket event handlers
socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

