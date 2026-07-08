import { useState } from "react";
import { useRoom } from "../context/RoomContext";
import socket from "../socket";

// accepts a full YouTube URL or a bare video ID
const extractVideoId = (input) => {
  const str = input.trim();
  try {
    const url = new URL(str);
    return url.searchParams.get("v") || url.pathname.replace("/", "");
  } catch {
    return str; // assume it's already a raw ID
  }
};

export default function Controls() {
  const { myRole, videoState } = useRoom();
  const [url, setUrl] = useState("");

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

  const seekTo = (value) => {
    if (!canControl) return;
    socket.emit("seek", { time: Number(value) });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <button
          className="btn shrink-0"
          onClick={togglePlayback}
          disabled={!canControl || !videoState.videoId}
        >
          {videoState.isPlaying ? "Pause" : "Play"}
        </button>

        <input
          className="w-full accent-accent"
          type="range"
          min="0"
          max={videoState.duration || 100}
          step="1"
          value={Math.floor(videoState.currentTime || 0)}
          onChange={(e) => seekTo(e.target.value)}
          disabled={!canControl || !videoState.videoId}
        />

        <span className="text-xs text-muted min-w-[5.5rem] text-right select-none">
          {formatTime(videoState.currentTime || 0)} / {formatTime(videoState.duration || 0)}
        </span>
      </div>

      <div className="flex gap-2 items-center">
        <input
          className="input flex-1"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && canControl && loadVideo()}
          placeholder={
            canControl
              ? "Paste a YouTube URL or video ID..."
              : "Only the host or moderator can change the video"
          }
          disabled={!canControl}
        />
        <button
          className="btn shrink-0"
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
