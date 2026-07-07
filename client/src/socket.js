import { io } from "socket.io-client";

// Singleton socket instance shared across the app
const socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:3000", {
  autoConnect: false, // connect only when user enters a room
});

export default socket;
