// src/pages/MyLeaves.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyLeaves({ employeeId }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/leaves/employee/${employeeId}`);
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Leave Requests</h2>
      <ul className="space-y-3">
        {leaves.map((leave) => (
          <li
            key={leave._id}
            className="p-4 bg-white rounded shadow flex justify-between"
          >
            <div>
              <p>
                <strong>{leave.type}</strong> ({leave.fromDate} → {leave.toDate})
              </p>
              <p>{leave.reason}</p>
            </div>
            <span
              className={`px-3 py-1 rounded text-white ${
                leave.status === "Accepted"
                  ? "bg-green-500"
                  : leave.status === "Rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {leave.status || "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
