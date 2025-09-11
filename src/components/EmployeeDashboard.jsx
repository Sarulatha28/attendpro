import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  const COLORS = ["#10B981", "#F59E0B", "#EF4444"];
  const empId = "EMP123"; // later take from login

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employee/${empId}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Welcome, {employee.name}
        </h1>
        <p className="text-gray-600 text-sm">Employee ID: {employee.empId}</p>
      </header>

      {/* Page Content */}
      <div className="flex-1 p-8 bg-gray-50">
        {active === "dashboard" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Attendance This Month</h3>
                <p className="text-3xl font-bold text-green-600">
                  {employee.attendance[4]?.present} /{" "}
                  {employee.attendance[4]?.present +
                    employee.attendance[4]?.absent}{" "}
                  Days
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Leaves Taken</h3>
                <p className="text-3xl font-bold text-yellow-500">
                  {
                    employee.leaves.filter((l) => l.status === "Approved")
                      .length
                  }
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Pending Requests</h3>
                <p className="text-3xl font-bold text-orange-500">
                  {
                    employee.leaves.filter((l) => l.status === "Pending")
                      .length
                  }
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attendance Line Chart */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">
                  My Attendance Summary
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={employee.attendance}>
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

              {/* Leave Pie Chart */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">My Leave Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Approved",
                          value: employee.leaves.filter(
                            (l) => l.status === "Approved"
                          ).length,
                        },
                        {
                          name: "Pending",
                          value: employee.leaves.filter(
                            (l) => l.status === "Pending"
                          ).length,
                        },
                        {
                          name: "Rejected",
                          value: employee.leaves.filter(
                            (l) => l.status === "Rejected"
                          ).length,
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={index} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
