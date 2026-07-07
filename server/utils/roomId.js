// Generates a 6-character room code e.g. "X7KP2Q"
// Avoids ambiguous characters like 0/O and 1/I so codes are easy to read and share.
const generateRoomId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

module.exports = generateRoomId;
