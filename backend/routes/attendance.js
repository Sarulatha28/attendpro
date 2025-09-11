import express from "express";
import Company from "../models/Company.js";
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import { haversineDistance } from "../utils/geo.js";

const router = express.Router();

/**
 * POST /api/attendance/check
 * body: { employeeId, lat, lng, type? }  type optional: "IN"/"OUT"
 */
router.post("/check", async (req, res) => {
  try {
    const { employeeId, lat, lng, type } = req.body;
    if (!employeeId || lat == null || lng == null) {
      return res.status(400).json({ message: "employeeId, lat and lng required" });
    }

    const employee = await Employee.findOne({ employeeId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const company = await Company.findOne({ companyId: employee.companyId });
    if (!company) return res.status(404).json({ message: "Company not found" });

    // company.geofence.center is [lng, lat]
    const [centerLng, centerLat] = company.geofence.center || [0, 0];
    const radius = company.geofence.radiusMeters || 100;

    const distance = haversineDistance(lat, lng, centerLat, centerLng);
    const inside = distance <= radius;

    // decide attendance type: if provided use it, else simple heuristic: IN if inside
    const attendanceType = type || (inside ? "IN" : "OUT");

    const record = new Attendance({
      employeeId,
      companyId: employee.companyId,
      type: attendanceType,
      lat,
      lng,
      insideGeofence: inside
    });
    await record.save();

    // Emit socket event via req.io (we attach io in server.js)
    if (req.io) {
      req.io.emit("attendance:update", {
        employeeId,
        name: employee.name,
        companyId: employee.companyId,
        type: attendanceType,
        inside,
        timestamp: record.timestamp
      });
    }

    return res.json({
      message: "Attendance recorded",
      inside,
      distanceMeters: distance,
      record
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
