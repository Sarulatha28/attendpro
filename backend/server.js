import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employee.js";
import attendanceRoutes from "./routes/attendance.js";
import seedRoutes from "./routes/seed.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new IOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());
app.use("/api/employees", employeeRoutes);

// Attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/attendance", attendanceRoutes);
app.use("/api/seed", seedRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ AutoAttend API Running...");
});

// Socket.io events
io.on("connection", (socket) => {
  console.log("⚡ Socket connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// Start server after DB connection
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
