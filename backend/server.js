import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import employeeRoutes from "./routes/employee.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "backend/uploads")));

// ✅ Routes
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ✅ MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/attendpro", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
