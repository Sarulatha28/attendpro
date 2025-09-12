import React, { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Pooja",
    email: "pooja@example.com",
    role: "Employee",
    phone: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Profile Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
        {/* Profile Picture */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-60px]">
          <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 shadow-xl">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
        <p className="text-gray-600">Role: {profile.role}</p>
        <p className="text-gray-600">Email: {profile.email}</p>
      </div>

      {/* Full Page Form */}
      <form
        onSubmit={handleSave}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-200 mt-10 space-y-8"
      >
        {/* User Basic Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-sm"
              required
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={profile.department}
              onChange={handleChange}
              placeholder="Enter your department"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-sm"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Role
          </label>
          <input
            type="text"
            value={profile.role}
            readOnly
            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-10 py-3 rounded-lg text-white font-bold text-lg bg-gradient-to-r from-blue-600 to-pink-500 shadow-lg hover:scale-105 transform transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;