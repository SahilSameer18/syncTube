// rooms is a plain shared object that lives in memory as long as the server runs.
// Shape: { [roomId]: { hostId, participants: { [socketId]: { username, role } }, videoState } }
const rooms = require("../utils/roomStore");

module.exports = (io, socket) => {

  // ── join_room ─────────────────────────────────────────────────────────────
  // Called when a user creates or joins a room.
  // First person to join becomes the host; everyone else is a participant.
  socket.on("join_room", ({ roomId, username }) => {
    if (!roomId || !username) return;

    // Create the room if it doesn't exist yet
    if (!rooms[roomId]) {
      rooms[roomId] = {
        hostId: socket.id,
        participants: {},
        videoState: { videoId: null, currentTime: 0, isPlaying: false },
      };
    }

    const role = rooms[roomId].hostId === socket.id ? "host" : "participant";
    rooms[roomId].participants[socket.id] = { username, role };

    // Store roomId and username on the socket so other events can access them
    socket.data.roomId = roomId;
    socket.data.username = username;
    socket.join(roomId); // join the Socket.IO room (for broadcasting)

    // Send the current room state back to the person who just joined
    socket.emit("room_joined", {
      roomId,
      role,
      participants: getParticipants(roomId),
      videoState: rooms[roomId].videoState,
    });

    // Notify everyone else in the room that a new person joined
    socket.to(roomId).emit("user_joined", {
      userId: socket.id,
      username,
      role,
      participants: getParticipants(roomId),
    });
  });


  // ── play ──────────────────────────────────────────────────────────────────
  // Host or Moderator pressed play. Update state and broadcast to others.
  socket.on("play", ({ currentTime }) => {
    const { roomId } = socket.data;
    if (!canControl(roomId, socket.id)) return;

    rooms[roomId].videoState.isPlaying = true;
    rooms[roomId].videoState.currentTime = currentTime;

    // We use socket.to() instead of io.to() so the sender doesn't receive their own event
    socket.to(roomId).emit("play", { currentTime });
  });


  // ── pause ─────────────────────────────────────────────────────────────────
  socket.on("pause", ({ currentTime }) => {
    const { roomId } = socket.data;
    if (!canControl(roomId, socket.id)) return;

    rooms[roomId].videoState.isPlaying = false;
    rooms[roomId].videoState.currentTime = currentTime;
    socket.to(roomId).emit("pause", { currentTime });
  });


  // ── seek ──────────────────────────────────────────────────────────────────
  // When a user scrubs the video timeline, everyone else jumps to that position.
  socket.on("seek", ({ time }) => {
    const { roomId } = socket.data;
    if (!canControl(roomId, socket.id)) return;

    rooms[roomId].videoState.currentTime = time;
    socket.to(roomId).emit("seek", { time });
  });


  // ── change_video ──────────────────────────────────────────────────────────
  // Load a new YouTube video for the whole room and reset playback state.
  // io.to() is used here so the sender also switches video (not just others).
  socket.on("change_video", ({ videoId }) => {
    const { roomId } = socket.data;
    if (!canControl(roomId, socket.id)) return;

    rooms[roomId].videoState = { videoId, currentTime: 0, isPlaying: false };
    io.to(roomId).emit("change_video", { videoId });
  });


  // ── sync_request ──────────────────────────────────────────────────────────
  // A late joiner asks: "what's the current video state?"
  // We reply only to that socket with the current videoState.
  socket.on("sync_request", () => {
    const { roomId } = socket.data;
    if (!rooms[roomId]) return;
    socket.emit("sync_state", rooms[roomId].videoState);
  });


  // ── assign_role ───────────────────────────────────────────────────────────
  // Host promotes/demotes a participant (e.g. participant → moderator).
  socket.on("assign_role", ({ targetUserId, role }) => {
    const { roomId } = socket.data;
    if (!isHost(roomId, socket.id)) return socket.emit("error", { message: "Only the host can assign roles" });
    if (!rooms[roomId].participants[targetUserId]) return;

    rooms[roomId].participants[targetUserId].role = role;

    // Broadcast updated participant list so all UIs update role badges
    io.to(roomId).emit("role_assigned", {
      userId: targetUserId,
      role,
      participants: getParticipants(roomId),
    });
  });


  // ── remove_participant ────────────────────────────────────────────────────
  // Host kicks someone out of the room.
  socket.on("remove_participant", ({ targetUserId }) => {
    const { roomId } = socket.data;
    if (!isHost(roomId, socket.id)) return socket.emit("error", { message: "Only the host can remove participants" });

    // Tell the kicked person before removing them
    const targetSocket = io.sockets.sockets.get(targetUserId);
    if (targetSocket) {
      targetSocket.emit("removed_from_room");
      targetSocket.leave(roomId);
    }

    delete rooms[roomId].participants[targetUserId];
    io.to(roomId).emit("participant_removed", {
      userId: targetUserId,
      participants: getParticipants(roomId),
    });
  });


  // ── leave / disconnect ────────────────────────────────────────────────────
  // Handles both intentional leave and browser tab close.
  const handleLeave = () => {
    const { roomId, username } = socket.data;
    if (!roomId || !rooms[roomId]) return;

    delete rooms[roomId].participants[socket.id];

    // If the room is now empty, clean it up from memory
    if (Object.keys(rooms[roomId].participants).length === 0) {
      delete rooms[roomId];
      return;
    }

    // If the host left, auto-promote the next person in the room
    let newHostId = null;
    if (rooms[roomId].hostId === socket.id) {
      newHostId = Object.keys(rooms[roomId].participants)[0];
      rooms[roomId].hostId = newHostId;
      rooms[roomId].participants[newHostId].role = "host";
    }

    io.to(roomId).emit("user_left", {
      userId: socket.id,
      username,
      newHostId,
      participants: getParticipants(roomId),
    });
  };

  socket.on("leave_room", handleLeave);
  socket.on("disconnect", handleLeave);
};


// ── Helper functions ──────────────────────────────────────────────────────────

// Convert participants object to an array for easier use on the frontend
function getParticipants(roomId) {
  return Object.entries(rooms[roomId].participants).map(([id, data]) => ({
    userId: id,
    ...data,
  }));
}

// Returns true if this socket is allowed to control playback (host or moderator)
function canControl(roomId, socketId) {
  const room = rooms[roomId];
  if (!room) return false;
  const role = room.participants[socketId]?.role;
  return role === "host" || role === "moderator";
}

// Returns true if this socket is the host of the room
function isHost(roomId, socketId) {
  return rooms[roomId]?.hostId === socketId;
}
