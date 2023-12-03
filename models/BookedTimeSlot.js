const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookedTimeSlot = new Schema({
  date: String,
  time: String,
  userId: String,
  isTimeSlotAvailable: Boolean,
  testType: { type: String, enum: ["G2", "G"] },
});
const BookedTimeSlotModel = mongoose.model("bookedTimeSlot", bookedTimeSlot);

module.exports = BookedTimeSlotModel;
