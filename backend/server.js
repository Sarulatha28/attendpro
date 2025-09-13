// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import adminRoutes from "./routes/adminRoutes.js";
import employeeLoginRoutes from "./routes/employeeLogin.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";

const app = express();
const server = http.createServer(app);

// ✅ CORS Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,
}));

// ✅ Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Must match frontend
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  // Example: listen for events
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    // Broadcast to all clients
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Middleware
app.use(express.json());

// Serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeLoginRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);

// Dashboard API
app.get("/api/employees/dashboard", async (req, res) => {
  try {
    const dashboardData = {
      totalEmployees: 10,
      presentCount: 8,
      absentCount: 2,
      attendanceData: [
        { month: "Jan", present: 8, absent: 2 },
        { month: "Feb", present: 7, absent: 3 },
        { month: "Mar", present: 9, absent: 1 },
        { month: "Apr", present: 8, absent: 2 },
        { month: "May", present: 10, absent: 0 },
      ],
    };
    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Handle 404 routes
app.use((req, res) => {
  if (req.url.startsWith("/api/")) {
    res.status(404).json({ message: "API route not found" });
  } else {
    res.status(404).json({ message: "Route not found" });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
