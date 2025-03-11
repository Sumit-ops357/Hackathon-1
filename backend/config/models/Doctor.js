const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  availableSlots: [Date], // Array of available dates
});

module.exports = mongoose.model("Doctor", doctorSchema);

