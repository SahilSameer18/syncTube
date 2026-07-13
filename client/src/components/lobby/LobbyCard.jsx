import { AlertCircle, ArrowRight, User, Link2 } from "lucide-react";

export default function LobbyCard({
  tab,
  setTab,
  username,
  setUsername,
  roomCode,
  setRoomCode,
  error,
  clearError,
  handleCreate,
  handleJoin,
}) {
  return (
    <div className="w-full glass-card p-6 sm:p-10 rounded-3xl shadow-2xl">
      {/* Tab Switcher */}
      <div className="flex bg-black/50 border border-white/5 rounded-xl p-1 mb-8 relative">
        {/* Animated Background Pill */}
        <div 
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-lg shadow-md transition-transform duration-300 ease-out`}
          style={{ transform: tab === "create" ? "translateX(0)" : "translateX(100%)" }}
        />
        {["create", "join"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              clearError();
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer border-none relative z-10 transition-colors duration-300
              ${tab === t ? "text-white" : "bg-transparent text-muted hover:text-primary"}`}
          >
            {t === "create" ? "Create Room" : "Join Room"}
          </button>
        ))}
      </div>

      {/* Name Field */}
      <div className="mb-5 relative">
        <label className="block text-[10px] text-muted font-bold uppercase tracking-widest mb-2 ml-1">
          Display Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
            <User className="w-4 h-4" />
          </div>
          <input
            className="w-full bg-black/40 border border-white/10 focus:border-accent text-sm py-3.5 pl-10 pr-4 rounded-xl transition-all duration-300 placeholder:text-muted/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)] outline-none text-white"
            type="text"
            placeholder="e.g. Alex"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError();
            }}
            onKeyDown={(e) => e.key === "Enter" && (tab === "create" ? handleCreate() : handleJoin())}
            maxLength={20}
          />
        </div>
      </div>

      {/* Room Code Field — only on join tab */}
      {tab === "join" && (
        <div className="mb-5 animate-slideIn relative">
          <label className="block text-[10px] text-muted font-bold uppercase tracking-widest mb-2 ml-1">
            Room Code / Link
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              <Link2 className="w-4 h-4" />
            </div>
            <input
              className="w-full bg-black/40 border border-white/10 focus:border-accent text-sm tracking-widest uppercase py-3.5 pl-10 pr-4 rounded-xl transition-all duration-300 placeholder:text-muted/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)] outline-none text-white"
              type="text"
              placeholder="e.g. X7KP2Q"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value);
                clearError();
              }}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              maxLength={120}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-danger text-xs font-semibold mb-5 bg-danger/10 border border-danger/20 px-4 py-3 rounded-xl animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        className="btn w-full py-4 mt-2 rounded-xl text-sm tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-[0.98] transition-all duration-300 group"
        onClick={tab === "create" ? handleCreate : handleJoin}
      >
        {tab === "create" ? "Create Room" : "Join Room"}
        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
      </button>

      <p className="text-center text-muted/60 text-[10px] font-medium tracking-wide leading-relaxed mt-6">
        {tab === "create"
          ? "A unique 6-character room code will be generated."
          : "Ask the host for their room code or invitation link."}
      </p>
    </div>
  );
}
