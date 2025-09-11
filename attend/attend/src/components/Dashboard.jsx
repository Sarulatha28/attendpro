// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import AttendanceChecker from "./AttendanceChecker";
import { FiPlus } from "react-icons/fi";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeeCard from "../pages/EmployeeCard";
import EmployeeDetails from "../pages/EmployeeDetails";
import CompanyForm from "../pages/CompanyForm";
import { useApp } from "../AppContext";
import axios from "axios";
import Sidebar from "../components/Sidebar"; 
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function Dashboard() {
  const { employees, addEmployeeLocal, updates, company, updateCompanyLocal } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });

  const navigate = useNavigate(); // ✅ define navigate

  useEffect(() => {
    setFiltered(
      employees.filter(
        (e) =>
          e.name?.toLowerCase().includes(query.toLowerCase()) ||
          e.employeeId?.toLowerCase().includes(query.toLowerCase()) ||
          e.email?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setStats({
      total: employees.length,
      present: updates.filter((u) => u.type === "present").length,
      absent: employees.length - updates.filter((u) => u.type === "present").length,
    });
  }, [employees, query, updates]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>

            {/* Search */}
            <div className="flex ml-2 w-full md:w-96">
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Search employee by name / ID / email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Add Employee Button → Navigate */}
            <button
              onClick={() => navigate("/add-employee")}
              className="p-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
            >
              <FiPlus size={20} />
            </button>

            {/* ✅ Company Geo Button */}
            <button
              className="px-3 py-2 bg-green-600 text-white rounded"
              onClick={() => navigate("/company-form")} // better navigate instead of local
            >
              Set Company Geo
            </button>
          </div>
        </header>

        {/* quick stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm">Total Employees</div>
            <div className="text-xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm">Present</div>
            <div className="text-xl font-bold">{stats.present}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm">Absent</div>
            <div className="text-xl font-bold">{stats.absent}</div>
          </div>
        </section>

        {/* Charts + Company geo form */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Employee Attendance Summary</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">[ Chart placeholder ]</div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Company Geo</h3>
            <CompanyForm company={company} onSave={(c) => updateCompanyLocal(c)} />
          </div>
        </section>

        {/* Employee list + Recent events */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Employee List</h3>
            <div className="flex gap-3 overflow-x-auto py-2">
              {filtered.length === 0 && <div className="text-sm text-gray-500">No employees</div>}
              {filtered.map((e) => (
                <EmployeeCard key={e._id} employee={e} onClick={() => setSelected(e)} />
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Recent Events</h3>
            <div className="space-y-2 max-h-96 overflow-auto">
              {updates.length === 0 && <div className="text-sm text-gray-500">No recent attendance</div>}
              {updates.map((u, i) => (
                <div key={i} className="p-2 border rounded">
                  <div className="text-sm font-medium">
                    {u.name} ({u.employeeId})
                  </div>
                  <div className="text-xs">
                    {u.type} — {u.inside ? "Inside" : "Outside"}
                  </div>
                  <div className="text-xs text-gray-500">{new Date(u.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Attendance checker */}
        <section className="mt-6">
          <AttendanceChecker />
        </section>

        {/* Modals */}
        {showForm && <AddEmployeeModal onClose={() => setShowForm(false)} onAdded={addEmployeeLocal} />}
        {selected && <EmployeeDetails employee={selected} onClose={() => setSelected(null)} />}
      </div>
    </div>
  );
}
