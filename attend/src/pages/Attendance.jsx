import React from "react";
import { Search, Filter, MoreVertical, Download } from "lucide-react";

const Attendance = () => {
  const attendanceData = [
    {
      id: 1,
      name: "Muhammad Ridwan",
      date: "30 Oct 2023",
      clockIn: "07:00",
      clockOut: "17:30",
      latitude: "-5.1343",
      longitude: "119.4165",
      uniqueId: "00:1A:2B:3C:4D:5E",
      editedBy: "Amelia Johnson",
    },
    {
      id: 2,
      name: "John Doe",
      date: "30 Oct 2023",
      clockIn: "07:11",
      clockOut: "17:15",
      latitude: "-5.1343",
      longitude: "119.4165",
      uniqueId: "08:76:54:32:10:AB",
      editedBy: "Amelia Johnson",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700">
          <Download size={18} />
          Export attendance
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search employee"
            className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
        </div>
        <button className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm hover:bg-gray-100">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Employee name</th>
              <th className="px-4 py-3">Attendance date</th>
              <th className="px-4 py-3">Clock in</th>
              <th className="px-4 py-3">Clock out</th>
              <th className="px-4 py-3">Latitude</th>
              <th className="px-4 py-3">Longitude</th>
              <th className="px-4 py-3">Unique ID</th>
              <th className="px-4 py-3">Edited by</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {attendanceData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.clockIn}</td>
                <td className="px-4 py-3">{row.clockOut}</td>
                <td className="px-4 py-3">{row.latitude}</td>
                <td className="px-4 py-3">{row.longitude}</td>
                <td className="px-4 py-3">{row.uniqueId}</td>
                <td className="px-4 py-3">{row.editedBy}</td>
                <td className="px-4 py-3 text-right">
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;