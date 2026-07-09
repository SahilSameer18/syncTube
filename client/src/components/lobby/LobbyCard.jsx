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
    <div className="w-full bg-surface/50 border border-line backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl shadow-black/10">
      {/* Tab Switcher */}
      <div className="flex gap-1 bg-bg border border-line/60 rounded-xl p-1 mb-6">
        {["create", "join"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              clearError();
            }}
            className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer border-none transition-all duration-200
              ${tab === t 
                ? "bg-accent text-white shadow-md shadow-accent/20 scale-[1.01]" 
                : "bg-transparent text-muted hover:text-primary"}`}
          >
            {t === "create" ? "Create Room" : "Join Room"}
          </button>
        ))}
      </div>

      {/* Name Field */}
      <div className="mb-4.5">
        <label className="block text-xs text-muted font-bold uppercase tracking-wider mb-2">
          Your Name
        </label>
        <input
          className="input transition-all duration-200 py-2.5 px-3.5"
          type="text"
          placeholder="e.g. Alex"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            clearError();
          }}
          maxLength={20}
        />
      </div>

      {/* Room Code Field — only on join tab */}
      {tab === "join" && (
        <div className="mb-4.5 animate-slideIn">
          <label className="block text-xs text-muted font-bold uppercase tracking-wider mb-2">
            Room Code or Shared Link
          </label>
          <input
            className="input tracking-widest uppercase transition-all duration-200 py-2.5 px-3.5"
            type="text"
            placeholder="e.g. X7KP2Q"
            value={roomCode}
            onChange={(e) => {
              setRoomCode(e.target.value);
              clearError();
            }}
            maxLength={120}
          />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-danger text-xs font-semibold mb-4.5 bg-danger/10 border border-danger/20 px-3.5 py-2.5 rounded-lg animate-fadeIn">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}

      <button
        className="btn w-full py-3 shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:scale-[1.01] mt-2 active:scale-[0.99] transition-all duration-150"
        onClick={tab === "create" ? handleCreate : handleJoin}
      >
        {tab === "create" ? "Create Room" : "Join Room"}
      </button>

      <p className="text-center text-muted text-[11px] leading-relaxed mt-5">
        {tab === "create"
          ? "A unique 6-character room code will be generated for you to invite others."
          : "Ask the watch party host for their room code or room invitation link."}
      </p>
    </div>
  );
}
