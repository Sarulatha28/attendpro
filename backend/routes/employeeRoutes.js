import express from "express";
import Employee from "../models/Employee.js";
import multer from "multer";
import bcrypt from "bcryptjs";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// POST /api/employees
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    let { name, employeeId, email, password, companyId, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password || !companyId || !phone) {
      return res.status(400).json({ message: "All fields except photo are required" });
    }

    // Auto-generate employeeId if empty
    if (!employeeId) {
      employeeId = "EMP-" + Date.now();
    }

    // Check for duplicate employeeId
    const exists = await Employee.findOne({ employeeId });
    if (exists) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      employeeId,
      email,
      password: hashedPassword,
      companyId,
      phone,
      photo: req.file ? req.file.path : null
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add employee", error: err.message });
  }
});

export default router;
