import { useState } from "react";
import { useRoom } from "../../context/RoomContext";
import socket from "../../socket";
import { ParticipantSkeleton } from "../Loader";
import { Crown, Shield, User, MoreHorizontal, Ban } from "lucide-react";

export default function ParticipantList() {
  const { myRole, participants } = useRoom();
  const isHost = myRole === "host";

  return (
    <div className="participants-section border-b border-white/5 bg-black/10">
      {/* header */}
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-surface/80 backdrop-blur-md z-10 border-b border-white/5">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted" />
          <span className="text-xs font-bold text-muted uppercase tracking-widest">
            Participants
          </span>
        </div>
        <span className="text-xs font-medium text-white bg-accent/20 border border-accent/30 px-2 py-0.5 rounded-full">
          {participants.length}
        </span>
      </div>

      {/* list */}
      {participants.length === 0 ? (
        <ParticipantSkeleton />
      ) : (
        <div className="pb-2 pt-1">
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

  const transferHost = () => {
    socket.emit("transfer_host", { targetUserId: participant.userId });
    setMenuOpen(false);
  };

  const kick = () => {
    socket.emit("remove_participant", { targetUserId: participant.userId });
    setMenuOpen(false);
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group relative"
    >
      {/* avatar: first letter of username */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md">
        {participant.username[0].toUpperCase()}
      </div>

      {/* name + badge */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-primary font-bold truncate leading-tight">
          {participant.username}
          {isMe && <span className="text-muted/60 font-normal text-xs ml-1">(you)</span>}
        </p>
        <p className={`text-[10px] sm:text-xs leading-tight flex items-center gap-1 mt-0.5 font-medium ${roleColor(participant.role)}`}>
          {roleIcon(participant.role)} {roleLabel(participant.role)}
        </p>
      </div>

      {/* action menu — only host sees this, not for themselves */}
      {isHost && !isMe && (
        <>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-muted hover:text-white transition-all bg-transparent border-none cursor-pointer p-1.5 rounded-md hover:bg-white/10 opacity-80 md:opacity-0 md:group-hover:opacity-100 relative z-20"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setMenuOpen(false)}
            >
              <div
                className="w-full max-w-[240px] glass border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-3 border-b border-white/10 bg-black/40">
                  <p className="text-xs font-bold text-muted uppercase tracking-wider text-center">
                    Manage {participant.username}
                  </p>
                </div>
                <div className="flex flex-col py-1.5 bg-surface/50">
                  {participant.role !== "moderator" ? (
                    <MenuItem onClick={() => assignRole("moderator")} label="Make Moderator" icon={<Shield className="w-4 h-4" />} />
                  ) : (
                    <MenuItem onClick={() => assignRole("participant")} label="Remove Mod" icon={<User className="w-4 h-4" />} />
                  )}
                  <MenuItem onClick={transferHost} label="Make Host" icon={<Crown className="w-4 h-4" />} />
                  <div className="border-t border-white/5 my-1.5 mx-2" />
                  <MenuItem onClick={kick} label="Remove from room" icon={<Ban className="w-4 h-4" />} danger />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MenuItem({ onClick, label, icon, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-left bg-transparent border-none cursor-pointer transition-colors hover:bg-white/10
        ${danger ? "text-danger hover:text-red-400 hover:bg-red-500/10" : "text-primary hover:text-white"}`}
    >
      {icon}
      {label}
    </button>
  );
}

const roleIcon = (role) =>
  ({ host: <Crown className="w-3 h-3" />, moderator: <Shield className="w-3 h-3" />, participant: <User className="w-3 h-3" /> }[role] ?? null);

const roleLabel = (role) =>
  ({ host: "Host", moderator: "Moderator", participant: "Participant" }[role] ?? "");

const roleColor = (role) =>
  ({ host: "text-yellow-400", moderator: "text-blue-400", participant: "text-muted" }[role] ?? "text-muted");
