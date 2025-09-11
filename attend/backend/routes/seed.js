import express from "express";
import Company from "../models/Company.js";
import Employee from "../models/Employee.js";

const router = express.Router();

router.post("/seed", async (req, res) => {
  try {
    // sample company center - put your coordinates here (lng, lat)
    const sampleCompany = {
      name: "Demo Company",
      companyId: "DEMOCO",
      geofence: {
        center: [77.6296, 12.9279], // [lng, lat] example for Coimbatore-ish
        radiusMeters: 150
      }
    };

    await Company.deleteMany({});
    await Employee.deleteMany({});

    const created = await Company.create(sampleCompany);
    const emp = await Employee.create({
      name: "Pooja Student",
      email: "pooja@example.com",
      employeeId: "EMP001",
      companyId: created.companyId
    });

    res.json({ company: created, employee: emp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
