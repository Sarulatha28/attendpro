// src/components/AddEmployeeModal.jsx
import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function AddEmployeeModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    education: "",
    experience: "",
    employeeId: "",
    aadhaarNumber: "",
    bankAccount: "",
    ifsc: "",
    panNumber: "",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (photo) data.append("profilePhoto", photo);

    const res = await axios.post("http://localhost:5000/api/employees", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert(res.data.message); // success message
    onClose(); // close modal
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error adding employee");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-full h-full p-10 relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white"
        >
          <X size={28} />
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center">Add Employee</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-full"
        >
          {/* Profile Upload */}
          <div className="flex flex-col items-center mb-8">
            <label htmlFor="profilePhoto" className="cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">
                    Click to Add Photo
                  </div>
                )}
              </div>
            </label>
            <input
              id="profilePhoto"
              type="file"
              onChange={handlePhotoChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
            <input
              name="name"
              onChange={handleChange}
              placeholder="Full Name"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="employeeId"
              onChange={handleChange}
              placeholder="Employee ID"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            />
            <input
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg col-span-2"
            />
            <input
              name="phone"
              onChange={handleChange}
              placeholder="Phone Number"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg col-span-2"
            />
            <input
              name="age"
              onChange={handleChange}
              placeholder="Age"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            />
            <select
              name="gender"
              onChange={handleChange}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              name="education"
              onChange={handleChange}
              placeholder="Education"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            />
            <input
              name="experience"
              onChange={handleChange}
              placeholder="Experience"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            />
            {/* New fields */}
            <input
              name="aadhaarNumber"
              onChange={handleChange}
              placeholder="Aadhaar Number"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            />
            <input
              name="bankAccount"
              onChange={handleChange}
              placeholder="Bank Account Number"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            />
            <input
              name="ifsc"
              onChange={handleChange}
              placeholder="IFSC Code"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg"
            />
           
          </div>

          {/* Buttons at center */}
          <div className="flex gap-4 mt-10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
