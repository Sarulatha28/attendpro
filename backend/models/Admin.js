import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  cmpId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model("Admin", adminSchema);
