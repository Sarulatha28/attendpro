import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Admin Sign Up</h2>

        {/* Company Name */}
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#6366F1" }}
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
          required
        />

        {/* Company ID */}
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#6366F1" }}
          type="text"
          name="cmpId"
          placeholder="Company ID"
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
          required
        />

        {/* Email */}
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#6366F1" }}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
          required
        />

        {/* Password */}
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#6366F1" }}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
          required
        />

        {/* Sign Up Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
        >
          Sign Up
        </motion.button>

        {/* Already have an account */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/adminsignin" className="text-indigo-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
