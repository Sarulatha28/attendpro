import express from "express";
import Leave from "../models/Leave.js";

const router = express.Router();

// Apply Leave
router.post("/apply", async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({ message: "Leave submitted", leave });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Leave Requests (Admin Dashboard)
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Status (Accept/Reject)
router.put("/:id", async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
