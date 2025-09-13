import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String }, // optional photo URL
  status: { type: String, enum: ["present", "absent"], default: "absent" },
});

// ✅ Fix overwrite error
const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
