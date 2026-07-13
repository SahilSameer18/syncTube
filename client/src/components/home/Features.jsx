import { FastForward, Link as LinkIcon, Shield, MessageSquare, Zap, MonitorSmartphone } from "lucide-react";

export default function Features() {
  const featuresList = [
    {
      title: "Real-time Playback Sync",
      desc: "Experience sub-millisecond video synchronization. When the host plays, pauses, or seeks, everyone's player responds instantly.",
      icon: <FastForward className="w-6 h-6 text-accent" />
    },
    {
      title: "Flexible Video Formats",
      desc: "Paste any YouTube link, custom MP4 source, or live stream to spin up a watch room instantly.",
      icon: <LinkIcon className="w-6 h-6 text-accent" />
    },
    {
      title: "Granular Host Controls",
      desc: "Lock controls to host-only or unlock them for everyone. Manage participants and transfer hosting privileges seamlessly.",
      icon: <Shield className="w-6 h-6 text-accent" />
    },
    {
      title: "Interactive Chat & Reactions",
      desc: "Talk in real time, check when users leave or join, and share live emoji reactions to capture key moments.",
      icon: <MessageSquare className="w-6 h-6 text-accent" />
    },
    {
      title: "Zero Setup Required",
      desc: "No registrations, card details, or emails. Open the lobby, name your profile, create a room, and start watching.",
      icon: <Zap className="w-6 h-6 text-accent" />
    },
    {
      title: "Responsive Across Devices",
      desc: "Fully optimized layout ensuring seamless synchronicity and interface sizing on desktops, tablets, and phones.",
      icon: <MonitorSmartphone className="w-6 h-6 text-accent" />
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-accent text-sm font-semibold tracking-wider uppercase">Features</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Designed for the Ultimate Watch Party Experience
          </h3>
          <p className="text-muted text-base sm:text-lg">
            Say goodbye to coordinating playback by counting down over a voice call. We synchronize the frames for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat, idx) => (
            <div
              key={idx}
              className="card bg-bg border border-line hover:border-accent/40 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 flex flex-col p-6 rounded-xl"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-5 border border-line group-hover:bg-accent/10 transition-colors duration-300">
                {feat.icon}
              </div>

              {/* Title & Desc */}
              <h4 className="text-lg font-bold text-primary mb-2.5 group-hover:text-accent transition-colors duration-200">
                {feat.title}
              </h4>
              
              <p className="text-muted text-sm leading-relaxed flex-1">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
