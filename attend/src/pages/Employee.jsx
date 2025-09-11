// src/components/modals/AddEmployeeModal.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Employee({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    age: "",
    adhaar: "",
    bankAccount: "",
    ifsc: "",
    experience: "",
    education: "",
    employeeId: "",
    companyId: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (file) formData.append("profilePhoto", file);

    try {
      await axios.post("http://localhost:5000/api/employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee added successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="gender" placeholder="Gender" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="adhaar" placeholder="Adhaar No" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="bankAccount" placeholder="Bank Account No" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="ifsc" placeholder="IFSC Code" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="experience" placeholder="Experience" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="education" placeholder="Education" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="employeeId" placeholder="Employee ID" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="companyId" placeholder="Company ID" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full p-2 border rounded" />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
