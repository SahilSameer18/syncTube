// This is the single source of truth for all active rooms.
// It's a plain JS object shared across all socket handler files via require().
// Since Node.js caches modules, every file that requires this gets the same object.
//
// Structure:
// {
//   [roomId]: {
//     hostId: string,              ← socket.id of the current host
//     participants: {
//       [socketId]: { username, role }
//     },
//     videoState: {
//       videoId: string | null,    ← YouTube video ID
//       currentTime: number,       ← seconds
//       isPlaying: boolean
//     }
//   }
// }

const rooms = {};

module.exports = rooms;

