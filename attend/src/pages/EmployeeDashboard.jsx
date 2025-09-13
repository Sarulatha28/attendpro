import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const attendanceData = [
  { month: "Jan", present: 20, absent: 2 },
  { month: "Feb", present: 18, absent: 4 },
  { month: "Mar", present: 22, absent: 0 },
  { month: "Apr", present: 19, absent: 3 },
  { month: "May", present: 21, absent: 1 },
];
const handleSetLocation = () => {
    navigate("/company-form"); // navigate to your route
  };

const leaveData = [
  { name: "Sick Leave", value: 3 },
  { name: "Casual Leave", value: 2 },
  { name: "Paid Leave", value: 1 },
];

const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-wide">EMPLOYEE</div>
        <nav className="flex-1">
          <ul>
            {["Dashboard", "Attendance", "Leave Requests", "Profile"].map(
              (item, idx) => (
                <li
                  key={idx}
                  className={`px-6 py-3 hover:bg-gray-700 cursor-pointer ${
                    idx === 0 ? "bg-gray-800" : ""
                  }`}
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Dashboard
          </h1>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700">Pooja (Employee)</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { label: "Attendance Days", value: 82, color: "text-green-600" },
            { label: "Leaves Taken", value: 6, color: "text-red-600" },
            { label: "Documents Submitted", value: 12, color: "text-blue-600" },
            { label: "Upcoming Holidays", value: 3, color: "text-yellow-600" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-gray-500">{stat.label}</h2>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Line Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Attendance Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#4CAF50" />
                <Line type="monotone" dataKey="absent" stroke="#F44336" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Leave Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leaveData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
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

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Attendance Summary
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#4CAF50" />
              <Bar dataKey="absent" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance List */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Attendance</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Work Hours</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "2025-09-01",
                  status: "Present",
                  color: "text-green-600",
                  hours: "8h",
                },
                {
                  date: "2025-09-02",
                  status: "Absent",
                  color: "text-red-600",
                  hours: "0h",
                },
                {
                  date: "2025-09-03",
                  status: "Present",
                  color: "text-green-600",
                  hours: "7h 30m",
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2">{row.date}</td>
                  <td className={`p-2 ${row.color}`}>{row.status}</td>
                  <td className="p-2">{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
