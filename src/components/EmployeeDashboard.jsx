// src/components/EmployeeDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplyLeave from "../pages/ApplyLeave";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const EmployeeDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  // Dummy personal data for employee
  const employeeName = "John Doe";
  const empId = "EMP123";

  const attendanceData = [
    { month: "Jan", present: 20, absent: 2 },
    { month: "Feb", present: 18, absent: 1 },
    { month: "Mar", present: 22, absent: 0 },
    { month: "Apr", present: 19, absent: 3 },
    { month: "May", present: 21, absent: 1 },
  ];

  const leaveData = [
    { name: "Approved", value: 2 },
    { name: "Pending", value: 1 },
    { name: "Rejected", value: 0 },
  ];

  const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "attendance", label: "My Attendance" },
    { id: "apply-leave", label: "Apply Leave" },
    { id: "notifications", label: "Notifications" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Welcome, {employeeName}
        </h1>
        <p className="text-gray-600 text-sm">Employee ID: {empId}</p>
      </header>

      {/* Page Content */}
      <div className="flex-1 p-8 bg-gray-50">
        {active === "dashboard" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Attendance This Month</h3>
                <p className="text-3xl font-bold text-green-600">20 / 22 Days</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Leaves Taken</h3>
                <p className="text-3xl font-bold text-yellow-500">3</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Pending Requests</h3>
                <p className="text-3xl font-bold text-orange-500">1</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Attendance Line Chart */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">
                  My Attendance Summary
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      stroke="#EF4444"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* My Leave Requests Pie Chart */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">My Leave Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={leaveData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {leaveData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {active === "attendance" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              My Attendance
            </h2>
            <p className="text-gray-600">
              Here you can track your daily/monthly attendance.
            </p>
          </div>
        )}

        {active === "apply-leave" && <ApplyLeave />}

        {active === "notifications" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Notifications
            </h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Company holiday on 15th Sept.</li>
              <li>Submit timesheet by Friday.</li>
            </ul>
          </div>
        )}

        {active === "profile" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">My Profile</h2>
            <p className="text-gray-600">
              Name: {employeeName} <br />
              Employee ID: {empId} <br />
              Department: IT <br />
              Role: Software Engineer
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
