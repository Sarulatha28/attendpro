// backend/controllers/employeeController.js
import Employee from "../models/Employee.js";

export const addEmployee = async (req, res) => {
  try {
    const { name, email, phone, age, gender, education, experience } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newEmployee = new Employee({
      name,
      email,
      phone,
      age,
      gender,
      education,
      experience,
      photo,
    });

    await newEmployee.save();
    res.json({ success: true, message: "Employee added", employee: newEmployee });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
