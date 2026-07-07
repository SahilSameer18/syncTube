import { useState } from "react";
import { useNavigate } from "react-router-dom";

// same logic as server/utils/roomId.js
const generateRoomId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export default function Home() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("create");
  const [username, setUsername] = useState(localStorage.getItem("st_username") || "");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const saveUsername = (val) => {
    setUsername(val);
    localStorage.setItem("st_username", val);
  };

  const handleCreate = () => {
    if (!username.trim()) return setError("Please enter your name.");
    navigate(`/room/${generateRoomId()}`, { state: { username: username.trim() } });
  };

  const handleJoin = () => {
    if (!username.trim()) return setError("Please enter your name.");
    if (roomCode.trim().length !== 6) return setError("Room code must be 6 characters.");
    navigate(`/room/${roomCode.trim().toUpperCase()}`, { state: { username: username.trim() } });
  };

  const clearError = () => setError("");

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* subtle purple glow — only decorative, needs radial-gradient so style is fine here */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)" }}
      />

      {/* hero */}
      <div className="text-center mb-10 relative z-10">
        <div className="text-5xl text-accent leading-none mb-3">▶</div>
        <h1 className="text-4xl font-bold text-primary tracking-tight">SyncTube</h1>
        <p className="text-muted mt-2">Watch YouTube videos together, perfectly in sync.</p>
      </div>

      {/* card */}
      <div className="card w-full max-w-md relative z-10">

        {/* tab switcher */}
        <div className="flex gap-1 bg-bg rounded-lg p-1 mb-6">
          {["create", "join"].map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); clearError(); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium cursor-pointer border-none transition-all duration-150
                ${tab === t ? "bg-accent text-white" : "bg-transparent text-muted hover:text-primary"}`}
            >
              {t === "create" ? "Create Room" : "Join Room"}
            </button>
          ))}
        </div>

        {/* name */}
        <div className="mb-4">
          <label className="block text-sm text-muted font-medium mb-1.5">Your name</label>
          <input
            className="input"
            type="text"
            placeholder="e.g. Alex"
            value={username}
            onChange={(e) => { saveUsername(e.target.value); clearError(); }}
            maxLength={20}
          />
        </div>

        {/* room code — only on join tab */}
        {tab === "join" && (
          <div className="mb-4">
            <label className="block text-sm text-muted font-medium mb-1.5">Room code</label>
            <input
              className="input tracking-widest uppercase"
              type="text"
              placeholder="e.g. X7KP2Q"
              value={roomCode}
              onChange={(e) => { setRoomCode(e.target.value.toUpperCase()); clearError(); }}
              maxLength={6}
            />
          </div>
        )}

        {error && <p className="text-danger text-sm mb-3">{error}</p>}

        <button
          className="btn w-full mt-1"
          onClick={tab === "create" ? handleCreate : handleJoin}
        >
          {tab === "create" ? "Create Room" : "Join Room"}
        </button>

        <p className="text-center text-muted text-xs mt-4">
          {tab === "create"
            ? "A unique room code will be generated for you to share."
            : "Ask the host for their 6-character room code."}
        </p>
      </div>
    </div>
  );
}
