import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import EmployeeDetails from "../models/EmployeeDetails.js";

const router = express.Router();

// Employee Sign In
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await EmployeeDetails.findOne({ email });

    if (!employee) return res.status(400).json({ message: "Employee not found" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Employee login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
