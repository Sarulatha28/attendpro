// src/pages/AdminLeaves.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/leaves/${id}/status`, { status });
      fetchLeaves(); // refresh after update
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Dates</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border text-center">
              <td className="p-2">{leave.name}</td>
              <td className="p-2">{leave.type}</td>
              <td className="p-2">
                {leave.fromDate} → {leave.toDate}
              </td>
              <td className="p-2">{leave.reason}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    leave.status === "Accepted"
                      ? "bg-green-500"
                      : leave.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {leave.status || "Pending"}
                </span>
              </td>
              <td className="p-2">
                {leave.status === "Pending" && (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => updateStatus(leave._id, "Accepted")}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(leave._id, "Rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
