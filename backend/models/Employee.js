// backend/models/Employee.js
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  phone: String,
  gender: String,
  age: Number,
  adhaar: String,
  bankAccount: String,
  ifsc: String,
  experience: String,
  education: String,
  profilePhoto: String, // store filename or cloud URL
  employeeId: { type: String, required: true },
  companyId: { type: String, required: true, index: true },
});

export default mongoose.model("Employee", employeeSchema);
