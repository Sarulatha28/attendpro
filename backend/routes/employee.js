import express from "express";
import multer from "multer";
import Employee from "../models/Employee.js";
import path from "path";

const router = express.Router();

// ✅ Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Add employee
router.post("/", upload.single("profilePhoto"), async (req, res) => {
  try {
    const newEmployee = new Employee({
      ...req.body,
      profilePhoto: req.file ? req.file.filename : null, // store filename only
    });

    await newEmployee.save();
    res
      .status(201)
      .json({ message: "✅ Employee added successfully", employee: newEmployee });
  } catch (err) {
    res
      .status(400)
      .json({ message: "❌ Error adding employee", error: err.message });
  }
});

// ✅ Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching employees" });
  }
});

// ✅ Get employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching employee" });
  }
});

export default router;
