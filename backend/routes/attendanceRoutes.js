// routes/attendanceRoutes.js
import express from "express";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js"; // make sure your employee model exists

const router = express.Router();

// Mark attendance (for Employee)
router.post("/mark", async (req, res) => {
  try {
    const { employeeId, latitude, longitude } = req.body;

    // Find employee
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Check if inside campus radius
    const distance = getDistanceFromLatLonInKm(
      latitude,
      longitude,
      employee.location.lat,
      employee.location.lng
    );

    if (distance > employee.location.radius) {
      return res.status(400).json({ message: "You are outside the campus" });
    }

    // Mark attendance
    const today = new Date().toISOString().split("T")[0];
    let attendance = await Attendance.findOne({ employee: employeeId, date: today });
    if (!attendance) {
      attendance = await Attendance.create({
        employee: employeeId,
        date: today,
        status: "present",
        checkInTime: new Date(),
      });
    }

    res.json({ message: "Attendance marked successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: "Error marking attendance", error: err.message });
  }
});

// Utility to calculate distance in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default router;
