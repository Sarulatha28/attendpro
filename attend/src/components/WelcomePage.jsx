import React from "react";
import { useNavigate } from "react-router-dom";
import video1 from "../assets/animatiom1.mp4"; // Ensure this video exists

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video1}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-pulse drop-shadow-lg">
          Welcome to AttendPro
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fadeIn">
          Choose your role to get started
        </p>

        <div className="flex space-x-6">
          {/* Employee */}
          <button
            onClick={() => navigate("/employeesignin")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-lg font-semibold rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Employee
          </button>

          {/* Admin */}
          <button
            onClick={() => navigate("/admin")}
            className="px-6 py-3 bg-green-600 hover:bg-green-800 text-lg font-semibold rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
