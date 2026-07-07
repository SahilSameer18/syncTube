import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4">
      <h1 className="text-7xl font-bold text-accent">404</h1>
      <p className="text-muted">This page or room doesn't exist.</p>
      <button className="btn" onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}