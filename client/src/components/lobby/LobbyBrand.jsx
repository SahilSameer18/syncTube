export default function LobbyBrand() {
  return (
    <div className="hidden lg:flex flex-1 relative items-center justify-center border-r border-white/5 overflow-hidden">
      {/* Abstract Glowing Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500 opacity-10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-lg px-12 animate-fadeIn">
        <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight text-primary leading-[1.1]">
          Your next-gen <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#60a5fa]">
            Watch Party.
          </span>
        </h1>
        <p className="mt-6 text-muted text-lg leading-relaxed">
          Experience sub-millisecond playback synchronization, ultra-low latency voice chat, and a beautiful theater mode. Build memories together, seamlessly.
        </p>

        {/* Decorative Floating Elements */}
        <div className="mt-12 flex gap-4">
           <div className="px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-primary flex items-center gap-2 shadow-xl">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> HD Sync
           </div>
           <div className="px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-primary flex items-center gap-2 shadow-xl">
             <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Voice Chat
           </div>
        </div>
      </div>
    </div>
  );
}

