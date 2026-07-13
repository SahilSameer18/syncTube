import { useState, useRef } from "react";
import { useRoom } from "../../context/RoomContext";
import socket from "../../socket";
import { Play, Pause, Search, Link } from "lucide-react";

// accepts a full YouTube URL (including youtu.be and /shorts/) or a bare video ID
const extractVideoId = (input) => {
  const str = input.trim();
  try {
    const url = new URL(str);
    // youtu.be/VIDEO_ID
    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1);
    }
    // youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return shortsMatch[1];
    // youtube.com/watch?v=VIDEO_ID
    return url.searchParams.get("v") || "";
  } catch {
    return str; // assume it's already a raw ID
  }
};

export default function Controls() {
  const { myRole, videoState } = useRoom();
  const [url, setUrl] = useState("");
  // local slider value while dragging — keeps UI smooth without flooding server
  const [dragging, setDragging] = useState(false);
  const dragValue = useRef(0);
  const [localTime, setLocalTime] = useState(0);

  const canControl = myRole === "host" || myRole === "moderator";

  const loadVideo = () => {
    const videoId = extractVideoId(url);
    if (!videoId) return;
    socket.emit("change_video", { videoId });
    setUrl("");
  };

  const togglePlayback = () => {
    if (!canControl) return;
    if (videoState.isPlaying) {
      socket.emit("pause", { currentTime: videoState.currentTime });
    } else {
      socket.emit("play", { currentTime: videoState.currentTime });
    }
  };

  // Update visual position while dragging without spamming the socket
  const handleSliderChange = (e) => {
    if (!canControl) return;
    dragValue.current = Number(e.target.value);
    setLocalTime(dragValue.current);
  };

  // Only emit the seek when the user releases the slider
  const handleSliderRelease = () => {
    if (!canControl) return;
    socket.emit("seek", { time: dragValue.current });
    setDragging(false);
  };

  const displayTime = dragging ? localTime : Math.floor(videoState.currentTime || 0);

  return (
    <div className="flex flex-col gap-4 bg-black/20 p-4 sm:p-5 rounded-2xl border border-white/5 backdrop-blur-md shadow-xl mt-4">
      {/* Player Controls Row */}
      <div className="flex gap-4 items-center">
        <button
          className="w-12 h-12 rounded-full bg-accent hover:bg-accent-dark text-white flex items-center justify-center shrink-0 shadow-lg shadow-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          onClick={togglePlayback}
          disabled={!canControl || !videoState.videoId}
          title={videoState.isPlaying ? "Pause" : "Play"}
        >
          {videoState.isPlaying ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-1" />
          )}
        </button>

        <div className="flex-1 flex flex-col gap-1.5 relative group">
          <input
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
            type="range"
            min="0"
            max={videoState.duration || 100}
            step="1"
            value={displayTime}
            onChange={handleSliderChange}
            onMouseDown={() => { setDragging(true); }}
            onTouchStart={() => { setDragging(true); }}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            disabled={!canControl || !videoState.videoId}
          />
          {/* Custom progress fill effect */}
          <div 
            className="absolute top-0 left-0 h-2 bg-accent rounded-full pointer-events-none transition-all duration-150"
            style={{ width: `${(displayTime / (videoState.duration || 100)) * 100}%` }}
          />
        </div>

        <span className="text-xs font-mono font-medium text-muted/80 min-w-[5.5rem] text-right select-none bg-black/40 px-2 py-1 rounded-md border border-white/5">
          {formatTime(displayTime)} / {formatTime(videoState.duration || 0)}
        </span>
      </div>

      {/* URL Input Row */}
      <div className="relative flex items-center w-full">
        <div className="absolute left-3.5 text-muted">
          {canControl ? <Search className="w-4 h-4" /> : <Link className="w-4 h-4" />}
        </div>
        <input
          className="w-full bg-black/40 border border-white/10 focus:border-accent text-sm py-3 pl-10 pr-28 rounded-xl transition-all placeholder:text-muted/50 disabled:opacity-60"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && canControl && loadVideo()}
          placeholder={
            canControl
              ? "Paste YouTube URL..."
              : "Hosts/mods only"
          }
          disabled={!canControl}
        />
        <button
          className="absolute right-1.5 btn py-1.5 px-3 sm:px-4 text-xs shadow-md shadow-accent/10 whitespace-nowrap"
          onClick={loadVideo}
          disabled={!canControl || !url.trim()}
        >
          Load
        </button>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}
