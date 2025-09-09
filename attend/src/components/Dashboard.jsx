import React, { useEffect, useState } from "react";
import AttendanceChecker from "./AttendanceChecker";
import { io } from "socket.io-client";
import { FiPlus } from "react-icons/fi";
import AddEmployeeModal from "./AddEmployeeModal"; // ⬅️ import modal

export default function Dashboard() {
  const [updates, setUpdates] = useState([]);
  const [showForm, setShowForm] = useState(false); // ⬅️ state to control modal

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000");
    socket.on("connect", () => console.log("socket connected", socket.id));
    socket.on("attendance:update", (data) => {
      setUpdates((u) => [data, ...u].slice(0, 10));
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* ✅ Plus icon opens the form */}
          <div
            className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 transition"
            onClick={() => setShowForm(true)}
          >
            <FiPlus size={22} className="text-gray-700" />
          </div>
        </div>
      </header>

      {/* Employee stats */}
      <section className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          Total Employees
          <br />
          <div className="text-xl font-bold">250</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Employee Absence
          <br />
          <div className="text-xl font-bold">245</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Total Document
          <br />
          <div className="text-xl font-bold">378</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Total Circulars
          <br />
          <div className="text-xl font-bold">45</div>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Employee Attendance Summary</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            [ Chart placeholder ]
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Document Submission</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            [ Donut chart placeholder ]
          </div>
        </div>
      </section>

      {/* Attendance List + Recent Events */}
      <section className="mt-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold mb-2">Employee Attendance List</h3>
            <AttendanceChecker />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Recent Events</h3>
          <div className="space-y-2">
            {updates.length === 0 && (
              <div className="text-sm text-gray-500">No recent attendance</div>
            )}
            {updates.map((u, i) => (
              <div key={i} className="p-2 border rounded">
                <div className="text-sm font-medium">
                  {u.name} ({u.employeeId})
                </div>
                <div className="text-xs">
                  {u.type} — {u.inside ? "Inside" : "Outside"}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(u.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Show modal if clicked */}
      {showForm && <AddEmployeeModal onClose={() => setShowForm(false)} />}
    </div>
  );
}
