// src/components/AddEmployeeModal.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AddEmployeeModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyId: "",
    employeeId: "",
    age: "",
    education: "",
    experience: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ handle photo upload
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // preview for round photo
    }
  };

  // ✅ submit form
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (imageFile) data.append("photo", imageFile);

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/employees",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onAdded && onAdded(res.data);
      alert("✅ Employee added successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Error adding employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Employee</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          {/* Round photo upload */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="photo"
              className="cursor-pointer w-32 h-32 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500 text-sm">+ Add Photo</span>
              )}
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </label>
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Company ID"
              value={form.companyId}
              onChange={(e) => setForm({ ...form, companyId: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              required
              placeholder="Employee ID"
              value={form.employeeId}
              onChange={(e) =>
                setForm({ ...form, employeeId: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Education"
              value={form.education}
              onChange={(e) =>
                setForm({ ...form, education: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              placeholder="Experience"
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
