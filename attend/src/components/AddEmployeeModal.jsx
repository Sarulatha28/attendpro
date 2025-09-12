import React, { useState } from "react";
import axios from "axios";

export default function AddEmployeeModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    name: "",
    empId: "",
    email: "",
    password: "",
    phone: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/employees", form);
    onAdded(); // refresh employee list
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="empId" placeholder="Employee ID" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="photo" placeholder="Photo URL" onChange={handleChange} className="w-full border p-2 rounded" />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Employee</button>
        </form>
      </div>
    </div>
  );
}
