import toast from "react-hot-toast";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";
import { Copy, Users, Crown, Shield, User, LogOut, Maximize, Minimize, Play } from "lucide-react";

function RoomCode({ roomId }) {
  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/room/${roomId}`);
    toast.success("Room link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono font-semibold tracking-widest text-primary text-xs sm:text-sm bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
        {roomId}
      </span>
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted hover:text-accent transition-colors cursor-pointer bg-black/20 hover:bg-accent/10 border border-white/5 hover:border-accent/30 px-2.5 py-1 rounded-md"
        title="Share Room Link"
      >
        <Copy className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Share</span>
      </button>
    </div>
  );
}

const roleIcon = (role) =>
  ({ host: <Crown className="w-3.5 h-3.5" />, moderator: <Shield className="w-3.5 h-3.5" />, participant: <User className="w-3.5 h-3.5" /> })[role] || null;

const roleLabel = (role) =>
  ({ host: "Host", moderator: "Mod", participant: "Viewer" })[role] || "";

const roleClass = (role) =>
  ({
    host: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    moderator: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    participant: "text-muted bg-white/5 border-white/10",
  })[role] || "text-muted";

export default function RoomHeader({ roomId, participants, myRole, theaterMode, setTheaterMode }) {
  const navigate = useNavigate();

  const handleLeave = () => {
    socket.emit("leave_room");
    socket.disconnect();
    navigate("/lobby");
  };

  return (
    <header className="room-header glass border-b border-white/10">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/20 border border-white/10">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>
        <span className="font-bold text-primary hidden sm:block tracking-tight text-lg">
          SyncTube
        </span>
        <span className="text-line hidden sm:block">|</span>
        <RoomCode roomId={roomId} />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={() => setTheaterMode(!theaterMode)}
          className="text-muted hover:text-primary transition-colors p-1.5 rounded-md hover:bg-white/5 border border-transparent focus:outline-none hidden md:flex items-center gap-1.5"
          title={theaterMode ? "Exit Theater Mode" : "Enter Theater Mode"}
        >
          {theaterMode ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        <span className="text-muted text-xs sm:text-sm hidden md:flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md border border-white/5">
          <Users className="w-3.5 h-3.5" /> {participants.length}
        </span>
        
        {myRole && (
          <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md border flex items-center gap-1.5 ${roleClass(myRole)}`}>
            {roleIcon(myRole)} <span className="hidden sm:inline">{roleLabel(myRole)}</span>
          </span>
        )}
        
        <button
          className="btn btn-ghost text-xs sm:text-sm px-3 py-1.5 flex items-center gap-1.5 hover:bg-danger/10 hover:text-danger hover:border-danger/30"
          onClick={handleLeave}
        >
          <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Leave</span>
        </button>
      </div>
    </header>
  );
}
