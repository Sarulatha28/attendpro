import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employeeRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js"; // ✅

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// API routes
app.use("/api/employees", employeeRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/attendance", attendanceRoutes); // ✅

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
