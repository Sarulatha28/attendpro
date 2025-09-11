import express from 'express';
import Company from '../models/Company.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await Company.deleteMany({});
    const c = new Company(req.body);
    await c.save();
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const c = await Company.find();
  res.json(c);
});

export default router;
