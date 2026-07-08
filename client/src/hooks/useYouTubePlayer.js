import { useRef, useEffect, useState } from "react";

export default function useYouTubePlayer(containerId, onStateChange, onError) {
  const playerRef = useRef(null);
  const onStateChangeRef = useRef(onStateChange);
  const onErrorRef = useRef(onError);
  const [ready, setReady] = useState(false);

  // keep the callback refs updated without recreating the player
  onStateChangeRef.current = onStateChange;
  onErrorRef.current = onError;

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return; // already created (strict mode double-run guard)

      playerRef.current = new window.YT.Player(containerId, {
        height: "100%",
        width: "100%",
        videoId: "",
        playerVars: {
          controls: 0,       // we build our own controls
          disablekb: 1,      // disable keyboard shortcuts
          rel: 0,            // no related videos at the end
          modestbranding: 1,
        },
        events: {
          onReady: () => setReady(true),
          // always forward to the latest handlers via refs
          onStateChange: (e) => onStateChangeRef.current(e),
          onError: (e) => onErrorRef.current && onErrorRef.current(e),
        },
      });
    };

    // YouTube API might already be loaded (script is in index.html)
    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []); // only run once

  return { playerRef, ready };
}

