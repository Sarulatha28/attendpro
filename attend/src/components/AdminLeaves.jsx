// src/pages/ApplyLeave.jsx
import React, { useState } from "react";
import axios from "axios";

export default function ApplyLeave() {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    type: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leaves/apply", formData);
      alert("Leave request submitted!");
    } catch (err) {
      alert("Error submitting leave request");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Leave Type</option>
          <option value="sick">Sick Leave</option>
          <option value="casual">Casual Leave</option>
          <option value="vacation">Vacation</option>
        </select>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
