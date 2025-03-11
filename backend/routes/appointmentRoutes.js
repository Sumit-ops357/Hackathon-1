const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Doctor sets availability
router.post("/availability", authenticate, authorize("doctor"), async (req, res) => {
  try {
    const { availableSlots } = req.body;
    await Doctor.findByIdAndUpdate(req.user.id, { availableSlots });
    res.json({ message: "Availability updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating availability" });
  }
});

// Get doctor availability
router.get("/availability/:doctorId", authenticate, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    res.json(doctor.availableSlots);
  } catch (error) {
    res.status(500).json({ error: "Error fetching availability" });
  }
});

module.exports = router;
