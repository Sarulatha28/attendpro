// backend/routes/employee.js
import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import Employee from "../models/Employee.js";

const router = express.Router();

// configure multer for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST /api/employees
router.post("/", upload.single("profilePhoto"), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      age,
      adhaar,
      bankAccount,
      ifsc,
      experience,
      education,
      employeeId,
      companyId,
    } = req.body;

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      passwordHash,
      phone,
      gender,
      age,
      adhaar,
      bankAccount,
      ifsc,
      experience,
      education,
      employeeId,
      companyId,
      profilePhoto: req.file ? req.file.filename : null,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully", newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding employee" });
  }
});

export default router;
