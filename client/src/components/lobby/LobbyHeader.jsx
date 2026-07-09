import { useNavigate } from "react-router-dom";

export default function LobbyHeader() {
  const navigate = useNavigate();

  return (
    <>
      {/* Absolute Header Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted hover:text-primary text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>

      {/* Background radial glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[300px] pointer-events-none rounded-full blur-[120px] opacity-25 bg-accent"
      />
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] pointer-events-none rounded-full blur-[100px] opacity-10 bg-cyan-500"
      />

      {/* Logo and Titles */}
      <div className="text-center mb-8 sm:mb-10 animate-fadeIn">
        <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-3xl text-accent leading-none mb-4 mx-auto shadow-lg shadow-accent/5">
          ▶
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
          SyncTube Lobby
        </h1>
        <p className="text-muted text-sm mt-2 max-w-xs sm:max-w-none">
          Join an existing room or create your watch party.
        </p>
      </div>
    </>
  );
}
