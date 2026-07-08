import { useState } from "react";
import { useRoom } from "../context/RoomContext";
import socket from "../socket";
import { ParticipantSkeleton } from "./Loader";

export default function ParticipantList() {
  const { myRole, participants } = useRoom();
  const isHost = myRole === "host";

  return (
    <div className="participants-section">
      {/* header */}
      <div className="px-4 py-2.5 flex items-center justify-between sticky top-0 bg-surface z-10">
        <span className="text-xs font-semibold text-muted uppercase tracking-widest">
          Participants
        </span>
        <span className="text-xs text-muted bg-surface2 px-2 py-0.5 rounded-full">
          {participants.length}
        </span>
      </div>

      {/* list */}
      {participants.length === 0 ? (
        <ParticipantSkeleton />
      ) : (
        <div className="pb-1">
          {participants.map((p) => (
            <ParticipantRow
              key={p.userId}
              participant={p}
              isHost={isHost}
              isMe={p.userId === socket.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ParticipantRow({ participant, isHost, isMe }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const assignRole = (role) => {
    socket.emit("assign_role", { targetUserId: participant.userId, role });
    setMenuOpen(false);
  };

  const kick = () => {
    socket.emit("remove_participant", { targetUserId: participant.userId });
    setMenuOpen(false);
  };

  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2 hover:bg-surface2 transition-colors group relative"
      onMouseLeave={() => setMenuOpen(false)}
    >
      {/* avatar: first letter of username */}
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
        {participant.username[0].toUpperCase()}
      </div>

      {/* name + badge */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-primary font-medium truncate leading-tight">
          {participant.username}
          {isMe && <span className="text-muted font-normal text-xs"> (you)</span>}
        </p>
        <p className={`text-xs leading-tight ${roleColor(participant.role)}`}>
          {roleLabel(participant.role)}
        </p>
      </div>

      {/* action menu — only host sees this, not for themselves */}
      {isHost && !isMe && (
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-muted hover:text-primary transition-all bg-transparent border-none cursor-pointer text-lg leading-none p-1.5 opacity-80 md:opacity-0 md:group-hover:opacity-100"
          >
            ⋯
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-7 w-44 bg-surface border border-line rounded-xl shadow-2xl z-20 overflow-hidden">
              {participant.role !== "moderator" ? (
                <MenuItem onClick={() => assignRole("moderator")} label="Make Moderator" icon="🛡️" />
              ) : (
                <MenuItem onClick={() => assignRole("participant")} label="Remove Mod" icon="👤" />
              )}
              <div className="border-t border-line" />
              <MenuItem onClick={kick} label="Remove from room" icon="🚫" danger />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MenuItem({ onClick, label, icon, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left bg-transparent border-none cursor-pointer transition-colors hover:bg-surface2
        ${danger ? "text-danger" : "text-primary"}`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

const roleLabel = (role) =>
  ({ host: "👑 Host", moderator: "🛡️ Moderator", participant: "👤 Participant" }[role] ?? "");

const roleColor = (role) =>
  ({ host: "text-yellow-400", moderator: "text-blue-400", participant: "text-muted" }[role] ?? "text-muted");


