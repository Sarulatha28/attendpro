import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyId: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String } // store file path
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
