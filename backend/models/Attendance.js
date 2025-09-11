import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  companyId: { type: String, required: true },
  type: { type: String, enum: ["IN", "OUT"], required: true },
  lat: Number,
  lng: Number,
  insideGeofence: Boolean,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Attendance", attendanceSchema);
