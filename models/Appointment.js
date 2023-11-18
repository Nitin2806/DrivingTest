const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  date: Date,
  time: [String],
  isTimeSlotAvailable: Boolean,
});

const Appointment = mongoose.model("appointment", AppointmentSchema);
module.exports = Appointment;
