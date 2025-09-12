import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: "",
    latitude: "",
    longitude: "",
    radius: "",
  });

  const [message, setMessage] = useState("");

  // fetch existing company info on load
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/company");
        if (res.data) {
          setForm({
            name: res.data.name,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            radius: res.data.radius,
          });
        }
      } catch (err) {
        console.error("Error fetching company info:", err);
      }
    };
    fetchCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/company", form);
      setMessage("Company information successfully added/updated!");
      setForm({
        name: res.data.name,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        radius: res.data.radius,
      });
    } catch (err) {
      console.error("Error saving company info:", err);
      setMessage("Error saving company information.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Company Geo Settings</h2>
      {message && <div className="mb-3 text-green-600">{message}</div>}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          placeholder="Company Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          placeholder="Latitude"
          value={form.latitude}
          onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          placeholder="Longitude"
          value={form.longitude}
          onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          placeholder="Radius (meters)"
          value={form.radius}
          onChange={(e) => setForm({ ...form, radius: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-2 rounded mt-2"
        >
          Save
        </button>
      </form>

      {/* Display saved company info */}
      {form.name && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold">Current Company Info:</h3>
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Latitude:</strong> {form.latitude}</p>
          <p><strong>Longitude:</strong> {form.longitude}</p>
          <p><strong>Radius:</strong> {form.radius} meters</p>
        </div>
      )}
    </div>
  );
}
