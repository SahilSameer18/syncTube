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
  const { myRole } = useRoom();
  const [url, setUrl] = useState("");

  const canControl = myRole === "host" || myRole === "moderator";

  const loadVideo = () => {
    const videoId = extractVideoId(url);
    if (!videoId) return;
    socket.emit("change_video", { videoId });
    setUrl("");
  };

  return (
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
  );
}
