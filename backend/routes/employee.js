import express from 'express';
import Employee from '../models/Employee.js';
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // simple file store; replace with S3 if needed

// create
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const body = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const emp = new Employee({ ...body, photoUrl });
    await emp.save();
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// list
router.get('/', async (req, res) => {
  const list = await Employee.find().sort({ name: 1 });
  res.json(list);
});

// get by id
router.get('/:id', async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  res.json(emp);
});

export default router;
