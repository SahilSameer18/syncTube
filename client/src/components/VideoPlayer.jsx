import { useEffect, useRef } from "react";
import { useRoom } from "../context/RoomContext";
import socket from "../socket";
import useYouTubePlayer from "../hooks/useYouTubePlayer";
import { SkeletonBlock } from "./Loader";

const PLAYER_DIV_ID = "yt-player";

export default function VideoPlayer() {
  const { videoState, setVideoState, myRole } = useRoom();
  const isSyncing = useRef(false); // prevents echo loop when we apply server events
  const lastLoadedId = useRef(null);

  const handleStateChange = (event) => {
    if (isSyncing.current) return;

    const player = event.target;
    const YT = window.YT.PlayerState;

    if (event.data === YT.PLAYING) {
      socket.emit("play", { currentTime: player.getCurrentTime() });
      setVideoState((prev) => ({ ...prev, isPlaying: true }));
    } else if (event.data === YT.PAUSED) {
      socket.emit("pause", { currentTime: player.getCurrentTime() });
      setVideoState((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  const { playerRef, ready } = useYouTubePlayer(PLAYER_DIV_ID, handleStateChange);

  // load video when videoId changes (host changed it, or late joiner syncing)
  useEffect(() => {
    if (!ready || !playerRef.current || !videoState.videoId) return;
    if (videoState.videoId === lastLoadedId.current) return;

    lastLoadedId.current = videoState.videoId;
    isSyncing.current = true;

    if (videoState.isPlaying) {
      playerRef.current.loadVideoById({ videoId: videoState.videoId, startSeconds: videoState.currentTime });
    } else {
      // cueVideoById loads without auto-playing — perfect for paused state sync
      playerRef.current.cueVideoById({ videoId: videoState.videoId, startSeconds: videoState.currentTime });
    }

    setTimeout(() => { isSyncing.current = false; }, 500);
  }, [videoState.videoId, ready]);

  // apply server play/pause/seek events to the player
  useEffect(() => {
    if (!ready) return;

    const sync = (fn) => {
      isSyncing.current = true;
      fn();
      setTimeout(() => { isSyncing.current = false; }, 300);
    };

    socket.on("play",  ({ currentTime }) => { if (playerRef.current) sync(() => { playerRef.current.seekTo(currentTime, true); playerRef.current.playVideo(); }); });
    socket.on("pause", ({ currentTime }) => { if (playerRef.current) sync(() => { playerRef.current.seekTo(currentTime, true); playerRef.current.pauseVideo(); }); });
    socket.on("seek",  ({ time })        => { if (playerRef.current) sync(() => playerRef.current.seekTo(time, true)); });

    return () => { socket.off("play"); socket.off("pause"); socket.off("seek"); };
  }, [ready]);

  // late joiner: ask server for the current video state once the player is ready
  useEffect(() => {
    if (ready) socket.emit("sync_request");
  }, [ready]);

  return (
    <div className="video-wrapper">
      <div id={PLAYER_DIV_ID} className="w-full h-full" />

      {/* Block interaction for participants (Watch-only) */}
      {myRole === "participant" && (
        <div className="absolute inset-0 z-20" title="Watch-only mode (Controls disabled)" />
      )}

      {/* shown before any video is loaded */}
      {!videoState.videoId && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <SkeletonBlock height="100%" width="100%" style={{ position: "absolute", inset: 0, borderRadius: 0, opacity: 0.6 }} />
          <div className="relative z-10 flex flex-col items-center gap-2 text-center px-4">
            <span className="text-4xl opacity-30">▶</span>
            <p className="text-muted text-sm">Paste a YouTube URL below to start watching</p>
          </div>
        </div>
      )}
    </div>
  );
}

