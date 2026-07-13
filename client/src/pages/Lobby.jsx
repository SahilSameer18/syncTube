import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LobbyHeader from "../components/lobby/LobbyHeader";
import LobbyBrand from "../components/lobby/LobbyBrand";
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
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row relative overflow-hidden">
      <LobbyHeader />

      {/* Left Side: Brand & Visuals */}
      <LobbyBrand />

      {/* Right Side: Interactive Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative min-h-screen lg:min-h-0">
        {/* Mobile Background Glows (Since left panel is hidden) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent opacity-25 blur-[120px] rounded-full lg:hidden pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10 pt-16 lg:pt-0">
           {/* Mobile Title */}
           <div className="lg:hidden text-center mb-8 animate-fadeIn">
             <h2 className="text-3xl font-extrabold text-primary tracking-tight">Join the Party</h2>
             <p className="text-muted text-sm mt-2">Create or enter a room code below.</p>
           </div>
           
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
    </div>
  );
}

