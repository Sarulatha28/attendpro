import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// Add attendance
router.post("/", async (req, res) => {
  try {
    const { employee, status, checkInTime, checkOutTime, location } = req.body;
    const newAttendance = await Attendance.create({
      employee,
      status,
      checkInTime,
      checkOutTime,
      location,
    });
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(500).json({ message: "Error adding attendance", error: err.message });
  }
});

// Get all attendance for an employee with percentage
router.get("/:employeeId", async (req, res) => {
  try {
    const records = await Attendance.find({ employee: req.params.employeeId });
    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === "present").length;
    const attendancePercent = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    res.json({ records, attendancePercent });
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance", error: err.message });
  }
});

export default router;
