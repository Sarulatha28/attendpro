import React, { useState } from "react";
import axios from "axios";

export default function AddEmployeeModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    password: "",
    companyId: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", form);
      setMessage("Employee added successfully ✅");
      setForm({
        name: "",
        employeeId: "",
        email: "",
        password: "",
        companyId: "",
        phone: "",
      });

      if (onAdded) onAdded(); // callback to parent to refresh list
      setTimeout(() => {
        setMessage("");
        if (onClose) onClose(); // close modal after success
      }, 1500);
    } catch (err) {
      console.error("Failed to add employee:", err);
      setMessage("Failed to add employee ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Add Employee</h2>
        {message && <p className="mb-3 text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="employeeId"
            placeholder="Employee ID (optional)"
            value={form.employeeId}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="companyId"
            placeholder="Company ID"
            value={form.companyId}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded mt-2"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}
