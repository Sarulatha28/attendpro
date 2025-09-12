import React, { useState } from "react";
import axios from "axios";

export default function AddEmployeeModal() {
  const [form, setForm] = useState({
    name: "",
    employeeId: "", // optional
    email: "",
    password: "",
    companyId: "",
    phone: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle photo selection
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("employeeId", form.employeeId || ""); // optional
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("companyId", form.companyId);
      formData.append("phone", form.phone);
      if (photo) formData.append("photo", photo);

      const res = await axios.post("http://localhost:5000/api/employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setForm({ name: "", employeeId: "", email: "", password: "", companyId: "", phone: "" });
      setPhoto(null);
      setPhotoPreview(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to add employee");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="employeeId"
          placeholder="Employee ID (optional)"
          value={form.employeeId}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="companyId"
          placeholder="Company ID"
          value={form.companyId}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handlePhoto} accept="image/*" />
        {photoPreview && (
          <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover mt-2" />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}
