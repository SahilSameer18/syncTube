import { useState, useEffect, useRef } from "react";
import { useRoom } from "../../context/RoomContext";
import socket from "../../socket";
import { Send, MessageSquareText } from "lucide-react";

export default function Chat() {
  const { messages } = useRoom();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // scroll to bottom whenever a new message arrives
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("chat_message", { message: input.trim() });
    setInput("");
  };

  return (
    <div className="chat-section flex flex-col h-full bg-black/10">
      {/* header */}
      <div className="px-4 py-3 shrink-0 flex items-center gap-2 border-b border-white/5">
        <MessageSquareText className="w-4 h-4 text-muted" />
        <span className="text-xs font-bold text-muted uppercase tracking-widest">Live Chat</span>
      </div>

      {/* messages */}
      <div className="chat-messages flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60 select-none">
            <MessageSquareText className="w-8 h-8 text-muted mb-2" />
            <p className="text-muted text-xs">
              No messages yet. Say something! 👋
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={`${msg.userId}-${msg.timestamp}`} msg={msg} isMe={msg.userId === socket.id} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* input bar */}
      <div className="chat-input-bar p-3 border-t border-white/5 bg-black/20">
        <div className="relative flex items-center w-full">
          <input
            className="input w-full bg-black/40 border-white/10 focus:border-accent text-sm py-2.5 pl-4 pr-12 rounded-full transition-all placeholder:text-muted/50"
            type="text"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            maxLength={300}
          />
          <button
            className="absolute right-1.5 p-1.5 rounded-full bg-accent hover:bg-accent-dark text-white disabled:opacity-50 disabled:bg-surface2 transition-colors flex items-center justify-center"
            onClick={sendMessage}
            disabled={!input.trim()}
            title="Send"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
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
    <div className={`flex flex-col gap-1 transition-all duration-300 animate-slideIn ${isMe ? "items-end" : "items-start"}`}>
      {/* name + time */}
      <div className="flex items-baseline gap-1.5 px-1.5">
        <span className={`text-[10px] font-bold tracking-wide ${isMe ? "text-accent-light" : "text-primary/90"}`}>
          {isMe ? "You" : msg.username}
        </span>
        <span className="text-muted/60 text-[9px] select-none">{time}</span>
      </div>

      {/* bubble */}
      <div
        className={`px-4 py-2.5 text-xs sm:text-sm max-w-[85%] break-words leading-relaxed shadow-sm
          ${isMe
            ? "bg-accent text-white rounded-2xl rounded-tr-sm border border-accent/20 shadow-accent/10"
            : "bg-white/10 text-primary rounded-2xl rounded-tl-sm border border-white/5"
          }`}
      >
        {msg.message}
      </div>
    </div>
  );
}
