import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employee.js';
import companyRoutes from './routes/company.js';
import attendanceRoutes from './routes/attendance.js';

dotenv.config();
const app = express();
const server = createServer(app);

// ✅ create socket.io only once
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST"]
  }
});

// ✅ expose io so routes can emit
app.set('io', io);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/attendance', attendanceRoutes);

// ✅ Socket.io events
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ✅ MongoDB connect
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/attenddb';
mongoose.connect(MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

// ✅ Run server only once
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
