import { createContext, useContext, useState, useEffect } from "react";
import socket from "../socket";

const RoomContext = createContext(null);

export function RoomProvider({ children }) {
  const [myRole, setMyRole] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [videoState, setVideoState] = useState({
    videoId: null,
    currentTime: 0,
    isPlaying: false,
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // When I successfully join a room
    socket.on("room_joined", (data) => {
      setMyRole(data.role);
      setParticipants(data.participants);
      setVideoState(data.videoState);
    });

    // Someone else joined
    socket.on("user_joined", (data) => {
      setParticipants(data.participants);
    });

    // Someone left
    socket.on("user_left", (data) => {
      setParticipants(data.participants);
    });

    // Host assigned a new role to someone
    socket.on("role_assigned", (data) => {
      setParticipants(data.participants);
      // update my own role if I was the target
      if (data.userId === socket.id) setMyRole(data.role);
    });

    // Someone was kicked
    socket.on("participant_removed", (data) => {
      setParticipants(data.participants);
    });

    // Late joiner: server sends current video state on sync_request
    socket.on("sync_state", (state) => {
      setVideoState(state);
    });

    // Host changed the video
    socket.on("change_video", ({ videoId }) => {
      setVideoState({ videoId, currentTime: 0, isPlaying: false });
    });

    socket.on("play", ({ currentTime }) => {
      setVideoState((prev) => ({ ...prev, currentTime, isPlaying: true }));
    });

    socket.on("pause", ({ currentTime }) => {
      setVideoState((prev) => ({ ...prev, currentTime, isPlaying: false }));
    });

    socket.on("seek", ({ time }) => {
      setVideoState((prev) => ({ ...prev, currentTime: time }));
    });

    // Chat message received
    socket.on("chat_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("room_joined");
      socket.off("user_joined");
      socket.off("user_left");
      socket.off("role_assigned");
      socket.off("participant_removed");
      socket.off("sync_state");
      socket.off("change_video");
      socket.off("play");
      socket.off("pause");
      socket.off("seek");
      socket.off("chat_message");
    };
  }, []);

  return (
    <RoomContext.Provider
      value={{
        myRole,
        participants,
        videoState,
        setVideoState,
        messages,
        socket,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

// shorthand hook so components don't need to import useContext + RoomContext
export const useRoom = () => useContext(RoomContext);
