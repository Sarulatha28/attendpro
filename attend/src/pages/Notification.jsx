// src/pages/Notification.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Notification() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leaves/${id}`, { status });
      fetchLeaves();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Leave Notifications</h1>
      {leaves.length === 0 ? (
        <p>No leave requests yet.</p>
      ) : (
        <div className="space-y-4">
          {leaves.map((leave) => (
            <div key={leave._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p><b>{leave.name}</b> (ID: {leave.employeeId})</p>
                <p>{leave.type} | {leave.fromDate.slice(0,10)} → {leave.toDate.slice(0,10)}</p>
                <p>Reason: {leave.reason}</p>
                <p>Status: <span className={
                  leave.status === "Pending" ? "text-yellow-600" :
                  leave.status === "Accepted" ? "text-green-600" : "text-red-600"
                }>{leave.status}</span></p>
              </div>
              {leave.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(leave._id, "Accepted")}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(leave._id, "Rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
