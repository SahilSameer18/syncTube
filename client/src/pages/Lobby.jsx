import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LobbyHeader from "../components/lobby/LobbyHeader";
import LobbyCard from "../components/lobby/LobbyCard";

// same logic as server/utils/roomId.js
const generateRoomId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
};

const extractRoomId = (input) => {
  const trimmed = input.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    const segments = url.pathname.split("/").filter(Boolean);
    const lastSegment = segments.at(-1);
    return lastSegment ? lastSegment.toUpperCase() : "";
  } catch {
    const match = trimmed.match(/\/room\/([A-Z0-9]{1,10})/i);
    return match ? match[1].toUpperCase() : trimmed.toUpperCase();
  }
};

export default function Lobby() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("create");
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!username.trim()) return setError("Please enter your name.");
    navigate(`/room/${generateRoomId()}`, {
      state: { username: username.trim() },
    });
  };

  const handleJoin = () => {
    if (!username.trim()) return setError("Please enter your name.");

    const roomId = extractRoomId(roomCode);
    if (roomId.length !== 6)
      return setError("Enter a valid 6-character room code or room link.");

    navigate(`/room/${roomId}`, { state: { username: username.trim() } });
  };

  const clearError = () => setError("");

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Background decorations, absolute header back navigation, and titles */}
      <LobbyHeader />

      {/* Main glassmorphic tab forms and form inputs */}
      <div className="w-full max-w-md relative z-10">
        <LobbyCard
          tab={tab}
          setTab={setTab}
          username={username}
          setUsername={setUsername}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          error={error}
          clearError={clearError}
          handleCreate={handleCreate}
          handleJoin={handleJoin}
        />
      </div>

    </div>
  );
}

