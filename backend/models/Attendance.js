import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // automatically set current date
  },
  checkInTime: {
    type: String,
  },
  checkOutTime: {
    type: String,
  },
  location: {
    latitude: { type: String },
    longitude: { type: String },
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
