import express from "express";
import Employee from "../models/Employee.js";  // ✅ fixed case

const router = express.Router();

// Employee SignIn
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    // Check password (simple check, should use bcrypt in production)
    if (employee.password !== password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.json({ message: "Employee Sign In Successful", employee });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
