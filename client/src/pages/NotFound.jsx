import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Background radial glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-10 pointer-events-none rounded-full bg-accent blur-[120px]" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[250px] h-[250px] opacity-10 pointer-events-none rounded-full bg-cyan-500 blur-[100px]" />

      <div className="text-center relative z-10 max-w-md space-y-6">
        
        {/* Animated Icon */}
        <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-4xl text-accent mx-auto animate-pulse">
          🔍
        </div>

        {/* 404 text with gradient */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-widest bg-gradient-to-b from-accent to-[#a78bfa] bg-clip-text text-transparent select-none leading-none">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
            Page Not Found
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            The room code might be invalid, expired, or the page you are looking for has been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="btn w-full sm:w-auto px-6 py-2.5 text-sm shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate("/lobby")}
            className="btn btn-ghost w-full sm:w-auto px-6 py-2.5 text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            Go to Lobby
          </button>
        </div>

      </div>
    </div>
  );
}