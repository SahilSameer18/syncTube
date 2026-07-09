import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useRoom } from "../context/RoomContext";
import socket from "../socket";
import VideoPlayer from "../components/room/VideoPlayer";
import Controls from "../components/room/Controls";
import ParticipantList from "../components/room/ParticipantList";
import Chat from "../components/room/Chat";
import Loader from "../components/Loader";
import RoomHeader from "../components/room/RoomHeader";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { myRole, participants } = useRoom();
  const [joined, setJoined] = useState(false);

  const username = location.state?.username || "Anonymous";

  useEffect(() => {
    socket.connect();
    socket.emit("join_room", { roomId, username });

    const onRoomJoined = () => setJoined(true);

    const onUserJoined = ({ username: name }) => {
      toast(`👋 ${name} joined the room`);
    };

    const onUserLeft = ({ username: name, newHostId }) => {
      if (name) toast(`🚪 ${name} left the room`);
      if (newHostId && newHostId === socket.id) {
        toast("👑 You are now the host!");
      }
    };

    const onRoleAssigned = ({ userId, role }) => {
      if (userId === socket.id) {
        if (role === "host") toast("👑 You are now the Host!");
        else toast(`✨ You are now a ${role}`);
      } else if (role === "host") {
        toast("👑 Host was transferred to another participant.");
      }
    };

    const onRemoved = () => {
      toast.error("You were removed from the room by the host.");
      navigate("/lobby", { replace: true });
    };

    const onError = ({ message }) => {
      if (message) toast.error(message);
    };

    socket.on("room_joined", onRoomJoined);
    socket.on("user_joined", onUserJoined);
    socket.on("user_left", onUserLeft);
    socket.on("role_assigned", onRoleAssigned);
    socket.on("removed_from_room", onRemoved);
    socket.on("error", onError);

    return () => {
      socket.off("room_joined", onRoomJoined);
      socket.off("user_joined", onUserJoined);
      socket.off("user_left", onUserLeft);
      socket.off("role_assigned", onRoleAssigned);
      socket.off("removed_from_room", onRemoved);
      socket.off("error", onError);

      socket.emit("leave_room");
      socket.disconnect();
    };
  }, []);

  if (!joined) {
    return (
      <Loader
        message="Joining Room"
        submessage="Getting your watch party ready..."
      />
    );
  }

  return (
    <div className="room-page">
      {/* Modular Room Navigation Header */}
      <RoomHeader 
        roomId={roomId} 
        participants={participants} 
        myRole={myRole} 
      />

      {/* Main Room Workspace Layout */}
      <div className="room-layout">
        <div className="room-main">
          <VideoPlayer />
          <Controls />
        </div>

        <div className="room-sidebar">
          <ParticipantList />
          <Chat />
        </div>
      </div>
    </div>
  );
}


