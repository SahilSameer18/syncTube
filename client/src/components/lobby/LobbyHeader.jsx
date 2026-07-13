import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";

export default function LobbyHeader() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 w-full p-6 z-50 flex items-center justify-between">
      {/* Brand Logo */}
      <div 
        onClick={() => navigate("/")} 
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-accent-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md shadow-accent/20 border border-white/10">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>
        <span className="font-extrabold text-xl tracking-tight text-primary hidden sm:block">
          SyncTube<span className="text-accent">.</span>
        </span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-muted hover:text-primary text-sm font-medium transition-all duration-200 cursor-pointer bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:bg-black/60"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back to Home</span>
      </button>
    </div>
  );
}
