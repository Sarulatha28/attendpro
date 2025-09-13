import React, { useState } from "react";
import axios from "axios";

export default function AddEmployeeModal() {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    password: "",
    photo: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/employees", form);
      alert("✅ Employee added: " + res.data.employee.name);
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow space-y-4">
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input type="text" name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input type="text" name="photo" placeholder="Photo URL" value={form.photo} onChange={handleChange} className="w-full p-2 border rounded"/>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Employee</button>
    </form>
  );
}
