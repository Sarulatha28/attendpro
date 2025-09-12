import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Admin Access</h1>
      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/adminsignin")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-lg font-semibold rounded-xl shadow-lg transition transform hover:scale-105"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/adminsignup")}
          className="px-6 py-3 bg-green-600 hover:bg-green-800 text-lg font-semibold rounded-xl shadow-lg transition transform hover:scale-105"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
