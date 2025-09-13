import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/signin", 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );
      
      // Store token and admin data
      localStorage.setItem('token', res.data.token);
      if (res.data.admin) {
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
      }
      
      alert(res.data.message);
      navigate("/dashboard"); // Redirect to admin dashboard after login
      
    } catch (err) {
      console.error("Login error:", err);
      
      if (err.code === 'ECONNREFUSED') {
        setError("Cannot connect to server. Please make sure the backend is running on port 5000.");
      } else if (err.response) {
        // Server responded with error status
        setError(err.response.data.message || "Login failed. Please check your credentials.");
      } else if (err.request) {
        // Request was made but no response received
        setError("Network error. Please check if the server is running.");
      } else {
        // Other errors
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Sign In</h1>
        
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Make sure your backend server is running on port 5000</p>
          <p className="mt-2">Command: <code>npm run dev</code> or <code>node server.js</code></p>
        </div>
      </div>
    </div>
  );
}