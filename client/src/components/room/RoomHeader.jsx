import toast from "react-hot-toast";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";

function RoomCode({ roomId }) {
  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/room/${roomId}`);
    toast.success("Room link copied!");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono font-semibold tracking-widest text-primary text-xs sm:text-sm">
        {roomId}
      </span>
      <button
        onClick={copyLink}
        className="text-[10px] sm:text-xs text-muted hover:text-primary transition-colors cursor-pointer bg-transparent border-none px-1.5 py-0.5 rounded"
      >
        Copy link
      </button>
    </div>
  );
}

const roleLabel = (role) =>
  ({ host: "👑 Host", moderator: "🛡️ Mod", participant: "👤 Viewer" })[role] ||
  "";

const roleClass = (role) =>
  ({
    host: "text-yellow-400",
    moderator: "text-blue-400",
    participant: "text-muted",
  })[role] || "text-muted";

export default function RoomHeader({ roomId, participants, myRole }) {
  const navigate = useNavigate();

  const handleLeave = () => {
    socket.emit("leave_room");
    socket.disconnect();
    navigate("/lobby");
  };

  return (
    <header className="room-header">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-accent font-bold text-lg">▶</span>
        <span className="font-bold text-primary hidden sm:block">
          SyncTube
        </span>
        <span className="text-line hidden sm:block">|</span>
        <RoomCode roomId={roomId} />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <span className="text-muted text-xs sm:text-sm hidden md:block">
          {participants.length} watching
        </span>
        {myRole && (
          <span className={`text-[10px] sm:text-xs font-semibold ${roleClass(myRole)}`}>
            {roleLabel(myRole)}
          </span>
        )}
        <button
          className="btn btn-ghost text-xs sm:text-sm px-3 py-1.5"
          onClick={handleLeave}
        >
          Leave
        </button>
      </div>
    </header>
  );
}
