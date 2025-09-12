import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  type: String,
  fromDate: Date,
  toDate: Date,
  reason: String,
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Leave", leaveSchema);
