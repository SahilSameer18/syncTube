export default function Features() {
  const featuresList = [
    {
      title: "Real-time Playback Sync",
      desc: "Experience sub-millisecond video synchronization. When the host plays, pauses, or seeks, everyone's player responds instantly.",
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Flexible Video Formats",
      desc: "Paste any YouTube link, custom MP4 source, or live stream to spin up a watch room instantly.",
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Granular Host Controls",
      desc: "Lock controls to host-only or unlock them for everyone. Manage participants and transfer hosting privileges seamlessly.",
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Interactive Chat & Reactions",
      desc: "Talk in real time, check when users leave or join, and share live emoji reactions to capture key moments.",
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Zero Setup Required",
      desc: "No registrations, card details, or emails. Open the lobby, name your profile, create a room, and start watching.",
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Responsive Across Devices",
      desc: "Fully optimized layout ensuring seamless synchronicity and interface sizing on desktops, tablets, and phones.",
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
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
