import React, { useState } from "react";
import API from "../api";

export default function AttendanceChecker() {
  const [status, setStatus] = useState("");
  const [last, setLast] = useState(null);
  const [employeeId, setEmployeeId] = useState("EMP001"); // default demo employee

  const checkIn = async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }
    setStatus("Getting location...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setStatus("Sending to server...");
        try {
          const res = await API.post("/attendance/check", { employeeId, lat, lng });
          setLast(res.data);
          setStatus(`Recorded: inside=${res.data.inside} distance=${Math.round(res.data.distanceMeters)}m`);
        } catch (err) {
          console.error(err);
          setStatus("Error: " + (err?.response?.data?.message || err.message));
        }
      },
      (err) => {
        setStatus("Location error: " + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div>
      <div className="flex gap-2 items-center mb-3">
        <input value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)} className="border p-2 rounded" />
        <button onClick={checkIn} className="bg-amber-500 px-4 py-2 rounded">Check Location</button>
      </div>
      <div className="text-sm text-gray-600 mb-2">Status: {status}</div>
      {last && (
        <div className="text-xs p-2 bg-gray-50 rounded">
          <div>Inside Geofence: {String(last.inside)}</div>
          <div>Distance: {Math.round(last.distanceMeters)} m</div>
          <div>Time: {new Date(last.record.timestamp).toLocaleString()}</div>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-500">
        Tip: open this page on your phone browser and click "Check Location" to use the phone GPS.
      </div>
    </div>
  );
}
