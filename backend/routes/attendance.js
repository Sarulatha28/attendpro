import express from 'express';
import Employee from '../models/Employee.js';
import Company from '../models/Company.js';
const router = express.Router();

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// endpoint to check a sample employee's location (for dashboard button)
router.post('/check-location', async (req, res) => {
  // expects { employeeId }
  const { employeeId } = req.body;
  const emp = await Employee.findOne({ employeeId });
  const comp = (await Company.findOne()) || null;
  if (!emp || !comp) return res.status(400).json({ error: "Missing data" });

  // use emp.lastLocation (this example assumes employee device updated that)
  if (!emp.lastLocation || !emp.lastLocation.lat) return res.status(400).json({ error: "No location for employee" });

  const dist = haversine(emp.lastLocation.lat, emp.lastLocation.lng, comp.lat, comp.lng);
  const status = dist <= comp.radius ? "inside" : "outside";

  // mark attendance (simple)
  if (status === "inside") {
    // emit an attendance event
    const io = req.app.get('io');
    const payload = {
      employeeId: emp.employeeId,
      name: emp.name,
      type: "present",
      inside: true,
      timestamp: new Date(),
    };
    io.emit('attendance:update', payload);
  }

  res.json({ status, distance: dist });
});

// endpoint used by device to send location updates and auto mark attendance
router.post('/location-update', async (req, res) => {
  // expects { employeeId, lat, lng }
  const { employeeId, lat, lng } = req.body;
  const emp = await Employee.findOne({ employeeId });
  const comp = (await Company.findOne()) || null;
  if (!emp) return res.status(400).json({ error: "No employee" });

  emp.lastLocation = { lat: parseFloat(lat), lng: parseFloat(lng), timestamp: new Date() };
  await emp.save();

  if (comp) {
    const dist = haversine(emp.lastLocation.lat, emp.lastLocation.lng, comp.lat, comp.lng);
    const inside = dist <= comp.radius;
    if (inside) {
      const io = req.app.get('io');
      io.emit('attendance:update', {
        employeeId: emp.employeeId,
        name: emp.name,
        type: "present",
        inside: true,
        timestamp: new Date(),
      });
    }
    return res.json({ ok: true, inside, distance: dist });
  }

  res.json({ ok: true });
});

export default router;
