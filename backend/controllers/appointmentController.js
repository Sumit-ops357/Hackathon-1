const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const sendSMS = require("../utils/twilioService");

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    const doctor = await Doctor.findById(doctorId);
    const patient = req.user;

    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const appointment = new Appointment({
      patient: patient.id,
      doctor: doctor.id,
      date,
      status: "Booked",
    });

    await appointment.save();

    // Send SMS confirmation
    sendSMS(patient.phone, `Your appointment with Dr. ${doctor.name} is confirmed for ${new Date(date).toLocaleString()}.`);

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Error booking appointment" });
  }
};

// Get patient appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id }).populate("doctor");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.status = "Canceled";
    await appointment.save();

    // Send SMS cancellation notice
    sendSMS(req.user.phone, `Your appointment on ${new Date(appointment.date).toLocaleString()} has been canceled.`);

    res.json({ message: "Appointment canceled" });
  } catch (error) {
    res.status(500).json({ error: "Error canceling appointment" });
  }
};

// Doctor sets availability
exports.setAvailability = async (req, res) => {
  try {
    const { availableSlots } = req.body;
    await Doctor.findByIdAndUpdate(req.user.id, { availableSlots });
    res.json({ message: "Availability updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating availability" });
  }
};

// Get doctor availability
exports.getAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    res.json(doctor.availableSlots);
  } catch (error) {
    res.status(500).json({ error: "Error fetching availability" });
  }
};
