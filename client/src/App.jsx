import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RoomProvider } from "./context/RoomContext";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* global toast container — dark-themed to match the app */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#0f0f1a",
              color: "#ededfa",
              border: "1px solid #1e1e35",
              fontSize: "0.875rem",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </RoomProvider>
    </BrowserRouter>
  );
}

export default App;
