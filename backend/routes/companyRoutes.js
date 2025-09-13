import express from "express";
import employeeRoutes from "./employeeRoutes.js"; // ✅ Correct path

const router = express.Router();

// Example company route
router.get("/", (req, res) => {
  res.json({ message: "Company route working ✅" });
});

// If you want companyRoutes to also expose employeeRoutes
router.use("/employees", employeeRoutes);

export default router;
