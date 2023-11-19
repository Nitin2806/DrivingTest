const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  try {
    const { date, time } = req.body;
    if (!date || !time) {
      return res.render("appointment", {
        error: "Invalid date or time format",
      });
    }
    const existingAppointment = await Appointment.findOne({
      date,
      time,
    });
    const checkIfDateAvailable = await Appointment.findOne({ date });
    let message = "Appointment set successfully";

    if (existingAppointment) {
      return res.render("appointment", {
        error: "Time slot already exists for the given dates",
      });
    } else if (checkIfDateAvailable) {
      const fetchTime = checkIfDateAvailable.time;

      let newTimeString = "";

      const existingTimeSlots = checkIfDateAvailable.time;
      // Filter out existing time slots to get new available time slots
      newTimeString = await time.filter(function (obj) {
        return fetchTime.indexOf(obj) == -1;
      });

      await Appointment.findOneAndUpdate(
        { date: date },
        {
          time: [...existingTimeSlots, ...newTimeString],
          isTimeSlotAvailable: true,
        }
      );
      return res.render("appointment", { message });
    } else {
      await Appointment.create({
        date,
        time,
        isTimeSlotAvailable: true,
      });

      return res.render("appointment");
    }
  } catch (error) {
    return res.render("appointment", {
      error: "Internal Server Error! Cannot set Appointment",
    });
  }
};
