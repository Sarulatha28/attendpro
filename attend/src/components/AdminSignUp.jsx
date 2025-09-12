import React, { useState } from "react";
import axios from "axios";

export default function AdminSignUp() {
  const [form, setForm] = useState({
    companyName: "",
    cmpId: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Sign Up</h2>

        {/* Company Name */}
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Company ID */}
        <input
          type="text"
          name="cmpId"
          placeholder="Company ID"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}
