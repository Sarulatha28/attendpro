import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

// Get company info (assume only one company)
router.get("/", async (req, res) => {
  try {
    const company = await Company.findOne();
    res.json(company || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update company info
router.post("/", async (req, res) => {
  try {
    const { name, latitude, longitude, radius } = req.body;

    let company = await Company.findOne();
    if (company) {
      // update existing
      company.name = name;
      company.latitude = latitude;
      company.longitude = longitude;
      company.radius = radius;
      await company.save();
    } else {
      company = new Company({ name, latitude, longitude, radius });
      await company.save();
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
