import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    email: { type: String },

    // ✅ Safe as Number
    phone: { type: Number },
    age: { type: Number },

    // ✅ Aadhaar (12 digits) → string safer
    aadhaarNumber: { type: String },

    // ✅ Bank account can be >15 digits → must be string
    bankAccount: { type: String },

    gender: { type: String },
    education: { type: String },
    experience: { type: String },
    ifsc: { type: String },
    panNumber: { type: String },
    profilePhoto: { type: String },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
