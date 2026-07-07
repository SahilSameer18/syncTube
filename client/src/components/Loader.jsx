export default function Loader({ message = "Loading", submessage = "Just a moment..." }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-6">

      {/* animated icon with pulsing ring */}
      <div className="relative w-16 h-16">
        <div className="pulse-ring" />
        <div className="relative z-10 w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl">
          ▶
        </div>
      </div>

      {/* message */}
      <div className="text-center flex flex-col gap-1.5">
        <h2 className="text-xl font-semibold text-primary">{message}</h2>
        <p className="text-sm text-muted">{submessage}</p>
      </div>

      {/* bouncing dots */}
      <div className="loader-dots">
        <span /><span /><span />
      </div>

    </div>
  );
}

// ── skeleton building blocks (used in Phase 5 for participant list + chat) ──

export function SkeletonBlock({ height = "1rem", width = "100%", style = {} }) {
  return <div className="skeleton" style={{ height, width, ...style }} />;
}

export function ParticipantSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="skeleton rounded-full w-8 h-8 shrink-0" />
          <div className="skeleton h-3.5" style={{ width: `${55 + i * 10}%` }} />
        </div>
      ))}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[80, 60, 70, 50, 75].map((w, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="skeleton h-2.5 w-[30%]" />
          <div className="skeleton h-3.5" style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>
  );
}



