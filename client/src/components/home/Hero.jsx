import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  
  // States for simulated stats
  const [stats, setStats] = useState({ rooms: 118420, hours: 4768290 });
  // Simulated chat messages
  const [mockChats, setMockChats] = useState([
    { id: 1, name: "Alex", text: "Wow, this video is hilarious! 😄", color: "text-[#3b82f6]" },
    { id: 2, name: "Sarah", text: "Lag is literally 0ms. So synced! 🚀", color: "text-[#10b981]" }
  ]);
  
  // Progress bar animation for mockup player
  const [playerProgress, setPlayerProgress] = useState(35);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // 1. Stats Counter Incrementor
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        rooms: prev.rooms + Math.floor(Math.random() * 2),
        hours: prev.hours + Math.floor(Math.random() * 3) + 1
      }));
    }, 4000);

    // 2. Playback progress bar simulation
    const playbackInterval = setInterval(() => {
      if (isPlaying) {
        setPlayerProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }
    }, 150);

    // 3. Simulated floating chat messages
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
        // Keep only the last 4 chat messages in view
        return [...prev.slice(-3), nextChat];
      });
    }, 3000);

    return () => {
      clearInterval(statsInterval);
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-surface/50 text-xs font-semibold text-accent-light tracking-wide text-[#a78bfa] backdrop-blur-sm animate-pulse">
               Introducing SyncTube Pro Watch Parties
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Watch Videos Together,{" "}
              <span className="bg-gradient-to-r from-accent via-[#a78bfa] to-[#60a5fa] bg-clip-text text-transparent">
                Perfecty in Sync.
              </span>
            </h1>
            
            <p className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              SyncTube lets you create watch rooms for YouTube, streams, and files. Chat, speak, and laugh with friends in real-time with sub-millisecond playback synchronization.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/lobby")}
                className="btn w-full sm:w-auto px-8 py-3.5 text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02]"
              >
                Create a Room
              </button>
              {/* <a
                href="#pricing"
                className="btn btn-ghost w-full sm:w-auto px-8 py-3.5 text-base hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                View Plans
              </a> */}
            </div>

            {/* Live Stats */}
            {/* <div className="pt-8 grid grid-cols-3 gap-4 border-t border-line/60 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary">
                  {stats.rooms.toLocaleString()}
                </div>
                <div className="text-xs text-muted font-medium mt-1">Rooms Opened</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary">
                  {(stats.hours / 1000000).toFixed(1)}M+
                </div>
                <div className="text-xs text-muted font-medium mt-1">Hours Synced</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-accent font-mono">
                  &lt; 5ms
                </div>
                <div className="text-xs text-muted font-medium mt-1">Sync Latency</div>
              </div>
            </div> */}
          </div>

          {/* Right Column: Live Synced Party Simulation Mockup */}
          <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">
            {/* Glowing borders around mockup */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-[#60a5fa] opacity-25 blur-lg" />
            
            {/* Mockup Container */}
            <div className="relative rounded-2xl bg-surface border border-line overflow-hidden shadow-2xl flex flex-col h-[320px] sm:h-[350px]">
              {/* Mockup Top Header */}
              <div className="bg-surface2 px-4 py-2.5 border-b border-line flex items-center justify-between text-xs text-muted font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted ml-2 font-mono bg-bg px-2 py-0.5 rounded border border-line">
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
                  <div className="flex-1 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-cover bg-center filter brightness-90 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop')]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Simulated Play overlay icon */}
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative z-10 w-12 h-12 rounded-full bg-accent/90 hover:bg-accent text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md cursor-pointer"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>

                    {/* Syced Avatars floating in player */}
                    <div className="absolute bottom-6 left-4 flex gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#3b82f6] border border-surface flex items-center justify-center text-[10px] font-bold text-white shadow-lg">A</div>
                      <div className="w-6 h-6 rounded-full bg-[#10b981] border border-surface flex items-center justify-center text-[10px] font-bold text-white shadow-lg">S</div>
                      <div className="w-6 h-6 rounded-full bg-[#ec4899] border border-surface flex items-center justify-center text-[10px] font-bold text-white shadow-lg">M</div>
                      <div className="w-6 h-6 rounded-full bg-[#f59e0b] border border-surface flex items-center justify-center text-[10px] font-bold text-white shadow-lg">J</div>
                    </div>
                  </div>

                  {/* Player seek/control bar */}
                  <div className="h-10 bg-surface/90 backdrop-blur-sm border-t border-line px-3 flex items-center gap-3">
                    <span className="text-[10px] text-muted font-mono">
                      {`0:${Math.floor((playerProgress / 100) * 180).toString().padStart(2, "0")}`} / 3:00
                    </span>
                    <div className="flex-1 h-1 bg-line rounded-full overflow-hidden relative cursor-pointer">
                      <div 
                        className="absolute top-0 left-0 h-full bg-accent transition-all duration-150"
                        style={{ width: `${playerProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated Chat Panel (Right Side) */}
                <div className="w-[140px] sm:w-[170px] bg-surface border-l border-line flex flex-col">
                  {/* Chat logs */}
                  <div className="flex-1 p-2 space-y-2.5 overflow-y-auto min-h-0 select-none">
                    {mockChats.map((chat) => (
                      <div key={chat.id} className="text-[10px] leading-snug animate-slideIn">
                        <span className={`font-semibold ${chat.color} mr-1`}>{chat.name}:</span>
                        <span className="text-primary">{chat.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chat input footer */}
                  <div className="p-1.5 border-t border-line bg-surface2">
                    <div className="w-full text-[9px] bg-bg border border-line rounded px-1.5 py-1 text-muted">
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
