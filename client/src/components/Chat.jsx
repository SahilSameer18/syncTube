import { useState, useEffect, useRef } from "react";
import { useRoom } from "../context/RoomContext";
import socket from "../socket";

export default function Chat() {
  const { messages } = useRoom();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // scroll to bottom whenever a new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("chat_message", { message: input.trim() });
    setInput("");
  };

  return (
    <div className="chat-section">
      {/* header */}
      <div className="px-4 py-2.5 shrink-0 flex items-center">
        <span className="text-xs font-semibold text-muted uppercase tracking-widest">Chat</span>
      </div>

      {/* messages */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="text-muted text-xs text-center mt-6 select-none">
            No messages yet. Say something! 👋
          </p>
        )}
        {messages.map((msg) => (
          <ChatMessage key={`${msg.userId}-${msg.timestamp}`} msg={msg} isMe={msg.userId === socket.id} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* input bar */}
      <div className="chat-input-bar">
        <input
          className="input flex-1 text-sm py-2"
          type="text"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          maxLength={300}
        />
        <button
          className="btn shrink-0 px-3"
          onClick={sendMessage}
          disabled={!input.trim()}
          title="Send"
        >
          ↑
        </button>
      </div>
    </div>
  );
}

function ChatMessage({ msg, isMe }) {
  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}>
      {/* name + time */}
      <div className="flex items-baseline gap-1.5 px-1">
        <span className={`text-xs font-semibold ${isMe ? "text-accent" : "text-primary"}`}>
          {isMe ? "You" : msg.username}
        </span>
        <span className="text-muted" style={{ fontSize: "0.68rem" }}>{time}</span>
      </div>

      {/* bubble */}
      <div
        className={`px-3 py-1.5 text-sm max-w-[85%] break-words
          ${isMe
            ? "bg-accent text-white rounded-2xl rounded-tr-sm"
            : "bg-surface2 text-primary rounded-2xl rounded-tl-sm"
          }`}
      >
        {msg.message}
      </div>
    </div>
  );
}
