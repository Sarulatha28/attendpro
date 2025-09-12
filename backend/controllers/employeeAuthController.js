import EmployeeAuth from "../models/EmployeeAuth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Employee (done by Admin)
export const registerEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await EmployeeAuth.findOne({ email });
    if (exists) return res.status(400).json({ message: "Employee already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await EmployeeAuth.create({ email, password: hashedPassword });

    res.status(201).json({ message: "Employee registered", employee });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Employee Login
export const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await EmployeeAuth.findOne({ email });
    if (!employee) return res.status(400).json({ message: "Employee not found" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token, employee });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
