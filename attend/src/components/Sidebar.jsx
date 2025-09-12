import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-60 bg-gray-800 text-white flex flex-col p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 cursor-pointer" onClick={() => navigate("/dashboard")}>
        AutoAttend
      </h2>
      <nav className="flex flex-col gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="hover:bg-gray-700 p-2 rounded text-left"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/notification")}
          className="hover:bg-gray-700 p-2 rounded text-left"
        >
          Notification
        </button>
        <button
          onClick={() => navigate("/log")}
          className="hover:bg-gray-700 p-2 rounded text-left"
        >
          Logs
        </button>
      </nav>
    </aside>
  );
}
