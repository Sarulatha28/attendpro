import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import EmployeeDetails from "../models/EmployeeDetails.js";

const router = express.Router();

// Admin Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { companyName, cmpId, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ companyName, cmpId, email, password: hashedPassword });
    await admin.save();
    res.json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin Sign In
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin adds Employee
router.post("/add-employee", async (req, res) => {
  try {
    const { name, employeeId, email, password } = req.body;

    const existing = await EmployeeDetails.findOne({ email });
    if (existing) return res.status(400).json({ message: "Employee already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new EmployeeDetails({ name, employeeId, email, password: hashedPassword });
    await employee.save();

    res.json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
