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
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leaves/apply", formData);
      alert("Leave request submitted!");
      setFormData({
        name: "",
        employeeId: "",
        type: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });
    } catch (err) {
      console.error("Error submitting leave", err);
      alert("Failed to submit leave request");
    }
  };

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-44 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
          Leave Application Form
        </h1>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-200 mt-10 space-y-6"
      >
        {/* Employee Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
          />
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
          />
        </div>

        {/* Leave Type */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
        >
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Annual Leave">Annual Leave</option>
        </select>

        {/* Date Range */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
          />
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
          />
        </div>

        {/* Reason */}
        <textarea
          name="reason"
          placeholder="Reason for leave"
          value={formData.reason}
          onChange={handleChange}
          required
          rows={5}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
        />

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg text-white font-bold bg-gradient-to-r from-blue-600 to-pink-500 shadow-md hover:scale-105 transform transition duration-300"
          >
            Submit
          </button>
          <button
            type="reset"
            onClick={() =>
              setFormData({
                name: "",
                employeeId: "",
                type: "",
                fromDate: "",
                toDate: "",
                reason: "",
              })
            }
            className="px-8 py-3 rounded-lg text-white font-bold bg-gray-500 hover:bg-gray-600 shadow-md transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
