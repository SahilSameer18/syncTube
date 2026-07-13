import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Users, ArrowRight } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  
  // Simulated chat messages
  const [mockChats, setMockChats] = useState([
    { id: 1, name: "Alex", text: "Wow, this video is hilarious! 😄", color: "text-[#3b82f6]" },
    { id: 2, name: "Sarah", text: "Lag is literally 0ms. So synced! 🚀", color: "text-[#10b981]" }
  ]);
  
  // Progress bar animation for mockup player
  const [playerProgress, setPlayerProgress] = useState(35);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Playback progress bar simulation
    const playbackInterval = setInterval(() => {
      if (isPlaying) {
        setPlayerProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }
    }, 150);

    // Simulated floating chat messages
    const chatTemplates = [
      { name: "John", text: "Wait, pause it for a sec!", color: "text-[#f59e0b]" },
      { name: "Mia", text: "Look at the background detail! 😮", color: "text-[#ec4899]" },
      { name: "Carlos", text: "Is this video 4K?", color: "text-[#8b5cf6]" },
      { name: "Emma", text: "Love this song so much! ❤️", color: "text-[#ef4444]" },
      { name: "Alex", text: "Resume play, I'm back!", color: "text-[#3b82f6]" },
      { name: "Sarah", text: "Let's queue up another one next.", color: "text-[#10b981]" }
    ];

    let templateIndex = 0;
    const chatInterval = setInterval(() => {
      setMockChats(prev => {
        const nextChat = {
          id: Date.now(),
          ...chatTemplates[templateIndex % chatTemplates.length]
        };
        templateIndex++;
        return [...prev.slice(-3), nextChat];
      });
    }, 3000);

    return () => {
      clearInterval(playbackInterval);
      clearInterval(chatInterval);
    };
  }, [isPlaying]);

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-bg">
      {/* Background glowing shapes */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[400px] opacity-20 pointer-events-none rounded-full bg-accent blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[400px] h-[300px] opacity-10 pointer-events-none rounded-full bg-cyan-500 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold tracking-wide text-[#a78bfa] backdrop-blur-sm animate-pulse shadow-lg shadow-accent/10">
               <Users className="w-3.5 h-3.5" /> Introducing SyncTube Pro Watch Parties
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Watch Videos Together,{" "}
              <span className="bg-gradient-to-r from-accent via-[#a78bfa] to-[#60a5fa] bg-clip-text text-transparent">
                Perfectly in Sync.
              </span>
            </h1>
            
            <p className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              SyncTube lets you create watch rooms for YouTube, streams, and files. Chat, speak, and laugh with friends in real-time with sub-millisecond playback synchronization.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => navigate("/lobby")}
                className="btn w-full sm:w-auto px-8 py-3.5 text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] rounded-full group"
              >
                Create a Room <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Synced Party Simulation Mockup */}
          <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">
            {/* Glowing borders around mockup */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-[#60a5fa] opacity-30 blur-xl animate-pulse" />
            
            {/* Mockup Container */}
            <div className="relative rounded-2xl glass border border-white/10 overflow-hidden glow-accent flex flex-col h-[320px] sm:h-[350px]">
              {/* Mockup Top Header */}
              <div className="bg-surface/80 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs text-muted font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted ml-2 font-mono bg-black/50 px-2 py-0.5 rounded border border-white/5">
                    sync-room-X7KP2Q
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-accent">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                  </span>
                  4 Online
                </div>
              </div>

              {/* Mockup Workspace */}
              <div className="flex-1 flex overflow-hidden">
                
                {/* Simulated Player (Left Side) */}
                <div className="flex-1 flex flex-col bg-[#05050a] relative group/player">
                  {/* Mock Video content */}
                  <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Simulated Play overlay icon */}
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative z-10 w-14 h-14 rounded-full bg-accent/90 hover:bg-accent text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xl shadow-accent/40 cursor-pointer backdrop-blur-sm"
                    >
                      <Play className={`w-6 h-6 fill-white ${isPlaying ? '' : 'ml-1'}`} />
                    </button>

                    {/* Syced Avatars floating in player */}
                    <div className="absolute bottom-6 left-4 flex gap-1.5">
                      <div className="w-7 h-7 rounded-full bg-[#3b82f6] border-2 border-black/50 flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-10 hover:-translate-y-1 transition-transform">A</div>
                      <div className="w-7 h-7 rounded-full bg-[#10b981] border-2 border-black/50 flex items-center justify-center text-[10px] font-bold text-white shadow-lg -ml-3 z-20 hover:-translate-y-1 transition-transform">S</div>
                      <div className="w-7 h-7 rounded-full bg-[#ec4899] border-2 border-black/50 flex items-center justify-center text-[10px] font-bold text-white shadow-lg -ml-3 z-30 hover:-translate-y-1 transition-transform">M</div>
                      <div className="w-7 h-7 rounded-full bg-[#f59e0b] border-2 border-black/50 flex items-center justify-center text-[10px] font-bold text-white shadow-lg -ml-3 z-40 hover:-translate-y-1 transition-transform">J</div>
                    </div>
                  </div>

                  {/* Player seek/control bar */}
                  <div className="h-10 bg-black/60 backdrop-blur-md border-t border-white/10 px-3 flex items-center gap-3">
                    <span className="text-[10px] text-muted font-mono">
                      {`0:${Math.floor((playerProgress / 100) * 180).toString().padStart(2, "0")}`} / 3:00
                    </span>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
                      <div 
                        className="absolute top-0 left-0 h-full bg-accent transition-all duration-150 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                        style={{ width: `${playerProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated Chat Panel (Right Side) */}
                <div className="w-[140px] sm:w-[170px] bg-black/40 backdrop-blur-sm border-l border-white/10 flex flex-col">
                  {/* Chat logs */}
                  <div className="flex-1 p-2 space-y-2.5 overflow-y-auto min-h-0 select-none">
                    {mockChats.map((chat) => (
                      <div key={chat.id} className="text-[10px] leading-snug animate-slideIn">
                        <span className={`font-semibold ${chat.color} mr-1`}>{chat.name}:</span>
                        <span className="text-primary/90">{chat.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chat input footer */}
                  <div className="p-1.5 border-t border-white/10 bg-black/50">
                    <div className="w-full text-[9px] bg-white/5 border border-white/10 rounded-md px-2 py-1.5 text-muted/70">
                      Type message...
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
