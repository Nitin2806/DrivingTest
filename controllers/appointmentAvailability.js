const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  try {
    const { date, time } = req.body;
    const existingAppointment = await Appointment.findOne({
      date,
      time,
    });
    const dateAvailable = await Appointment.findOne({ date });

    if (existingAppointment) {
      return res.render("appointment", {
        error: "Time slot already exists for the given dates",
      });
    } else if (dateAvailable) {
      const fetchTime = dateAvailable.time;

      let newTimeString = "";

      const existingTimeSlots = dateAvailable.time;
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
      return res.render("appointment");
    } else {
      await Appointment.create({
        date,
        time,
        isTimeSlotAvailable: true,
      });

      return res.render("appointment");
    }
  } catch (error) {
    console.log(error);

    return res.render("appointment", {
      error: "Internal Server Erorr! Cannot set Appointment",
    });
  }
};
