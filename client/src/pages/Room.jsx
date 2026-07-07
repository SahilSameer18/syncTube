import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useRoom } from "../context/RoomContext";
import socket from "../socket";
import VideoPlayer from "../components/VideoPlayer";
import Controls from "../components/Controls";
import ParticipantList from "../components/ParticipantList";
import Chat from "../components/Chat";
import Loader from "../components/Loader";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { myRole, participants } = useRoom();
  const [joined, setJoined] = useState(false);

  const username = location.state?.username || localStorage.getItem("st_username") || "Anonymous";

  useEffect(() => {
    socket.connect();
    socket.emit("join_room", { roomId, username });

    socket.on("room_joined", () => setJoined(true));

    socket.on("user_joined", ({ username: name }) => {
      toast(` ${name} joined the room`);
    });

    socket.on("user_left", ({ username: name }) => {
      if (name) toast(` ${name} left the room`);
    });

    socket.on("role_assigned", ({ userId, role }) => {
      if (userId === socket.id) toast(` You are now a ${role}`);
    });

    socket.on("removed_from_room", () => {
      toast.error("You were removed from the room by the host.");
      navigate("/", { replace: true });
    });

    return () => {
      socket.emit("leave_room");
      socket.disconnect();
    };
  }, []);

  if (!joined) {
    return <Loader message="Joining Room" submessage="Getting your watch party ready..." />;
  }

  return (
    <div className="room-page">
      <header className="room-header">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-accent font-bold text-lg">▶</span>
          <span className="font-bold text-primary hidden sm:block">SyncTube</span>
          <span className="text-line hidden sm:block">|</span>
          <RoomCode roomId={roomId} />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-muted text-sm hidden md:block">
            {participants.length} watching
          </span>
          {myRole && (
            <span className={`text-xs font-semibold ${roleClass(myRole)}`}>
              {roleLabel(myRole)}
            </span>
          )}
          <button
            className="btn btn-ghost text-sm px-3 py-1.5"
            onClick={() => { socket.emit("leave_room"); socket.disconnect(); navigate("/"); }}
          >
            Leave
          </button>
        </div>
      </header>

      <div className="room-layout">
        <div className="room-main">
          <VideoPlayer />
          <Controls />
        </div>

        <div className="room-sidebar">
          <ParticipantList />
          <Chat />
        </div>
      </div>
    </div>
  );
}

function RoomCode({ roomId }) {
  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/room/${roomId}`);
    toast.success("Room link copied!");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono font-semibold tracking-widest text-primary text-sm">
        {roomId}
      </span>
      <button
        onClick={copyLink}
        className="text-xs text-muted hover:text-primary transition-colors cursor-pointer bg-transparent border-none px-1.5 py-0.5 rounded"
      >
        Copy link
      </button>
    </div>
  );
}

const roleLabel = (role) =>
  ({ host: "👑 Host", moderator: "🛡️ Mod", participant: "👤 Viewer" }[role] || "");

const roleClass = (role) =>
  ({ host: "text-yellow-400", moderator: "text-blue-400", participant: "text-muted" }[role] || "text-muted");