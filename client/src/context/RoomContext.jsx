import { createContext, useContext, useState, useEffect } from "react";
import socket from "../socket";

const RoomContext = createContext(null);

export const RoomProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(null);
  const [myRole, setMyRole] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [videoState, setVideoState] = useState({ videoId: null, currentTime: 0, isPlaying: false });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // ── room_joined (sent only to me when I join) ──────────────────────────
    socket.on("room_joined", (data) => {
      setRoomId(data.roomId);
      setMyRole(data.role);
      setParticipants(data.participants);
      setVideoState(data.videoState);
    });

    // ── user_joined / user_left ────────────────────────────────────────────
    socket.on("user_joined", (data) => setParticipants(data.participants));
    socket.on("user_left", (data) => setParticipants(data.participants));

    // ── role updates ──────────────────────────────────────────────────────
    socket.on("role_assigned", (data) => {
      setParticipants(data.participants);
      // Update my own role if I was the target
      if (data.userId === socket.id) setMyRole(data.role);
    });

    // ── participant removed ────────────────────────────────────────────────
    socket.on("participant_removed", (data) => setParticipants(data.participants));

    // ── video state sync ──────────────────────────────────────────────────
    socket.on("sync_state", (state) => setVideoState(state));
    socket.on("change_video", ({ videoId }) =>
      setVideoState((prev) => ({ ...prev, videoId, currentTime: 0, isPlaying: false }))
    );

    // ── chat ──────────────────────────────────────────────────────────────
    socket.on("chat_message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    return () => {
      socket.off("room_joined");
      socket.off("user_joined");
      socket.off("user_left");
      socket.off("role_assigned");
      socket.off("participant_removed");
      socket.off("sync_state");
      socket.off("change_video");
      socket.off("chat_message");
    };
  }, []);

  return (
    <RoomContext.Provider value={{ roomId, myRole, participants, videoState, setVideoState, messages, socket }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
