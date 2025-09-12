import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../AppContext";
import Sidebar from "../components/Sidebar";
import AttendanceChecker from "../components/AttendanceChecker";
import EmployeeCard from "../pages/EmployeeCard";
import EmployeeDetails from "../pages/EmployeeDetails";

export default function Dashboard() {
  const { updates = [] } = useApp();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [showEmployees, setShowEmployees] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState(0);

  // Fetch total employees on load
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        if (Array.isArray(res.data)) {
          setTotalEmployees(res.data.length);
          setEmployees(res.data); // keep employees ready
        } else if (res.data) {
          setTotalEmployees(1);
          setEmployees([res.data]);
        } else {
          setTotalEmployees(0);
          setEmployees([]);
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchTotal();
  }, []);

  const present = updates.filter((u) => u.type === "present").length;
  const absent = totalEmployees - present;

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
              onClick={() => navigate("/company-form")} // navigate to company form page
            >
              Set Company Geo
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => setShowEmployees(true)}
          >
            <div className="text-sm">Total Employees</div>
            <div className="text-xl font-bold">{totalEmployees}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm">Present</div>
            <div className="text-xl font-bold">{present}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm">Absent</div>
            <div className="text-xl font-bold">{absent}</div>
          </div>
        </section>

        {/* Employee Cards or Details */}
        {showEmployees && !selectedEmployee && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">All Employees</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {employees.map((emp) => (
                <EmployeeCard
                  key={emp._id}
                  employee={emp}
                  onClick={() => setSelectedEmployee(emp)}
                />
              ))}
            </div>
          </section>
        )}

        {selectedEmployee && (
          <EmployeeDetails
            employee={selectedEmployee}
            onBack={() => setSelectedEmployee(null)}
          />
        )}

        {/* Only show Attendance Summary and Checker if NOT showing employees */}
        {!showEmployees && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
