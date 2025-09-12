// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import AttendanceChecker from "./AttendanceChecker";

export default function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ total: 0, present: 0, absent: 0 });
  const [employees, setEmployees] = useState([]);

  // Fetch employees and summary
  const fetchSummary = async () => {
    try {
      // Total employees list
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
      setSummary({
        total: res.data.length,
        present: res.data.filter(emp => emp.status === "present").length,
        absent: res.data.filter(emp => emp.status !== "present").length,
      });
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  useEffect(() => {
    fetchSummary();
    const interval = setInterval(fetchSummary, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/add-employee")}
              className="p-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
            >
              <FiPlus size={20} />
            </button>
            <button
              className="px-3 py-2 bg-green-600 text-white rounded"
              onClick={() => navigate("/company-form")}
            >
              Set Company Geo
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => navigate("/employees")}
          >
            <div className="text-sm">Total Employees</div>
            <div className="text-xl font-bold">{summary.total}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm">Present</div>
            <div className="text-xl font-bold">{summary.present}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm">Absent</div>
            <div className="text-xl font-bold">{summary.absent}</div>
          </div>
        </section>

        {/* Attendance Summary & Checker */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-6">
          <div className="lg:col-span-2 bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Attendance Summary</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              [ Chart Placeholder ]
            </div>
          </div>
        </section>

        <section className="mt-6">
          <AttendanceChecker />
        </section>
      </div>
    </div>
  );
}
