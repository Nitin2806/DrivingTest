const BookedTimeSlotModel = require("../models/BookedTimeSlot");
const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  try {
    const { testType } = req.query;
    let appointments = "";
    if (testType != undefined) {
      appointments = await BookedTimeSlotModel.find({
        testType: testType,
      });
    } else {
      appointments = await BookedTimeSlotModel.find();
      console.log("non-filtering", appointments);
    }

    const userIds = appointments.map((appointment) => appointment.userId);

    const userDetails = await UserAccount.find({ _id: { $in: userIds } });

    const userDetailsMap = new Map(
      userDetails.map((user) => [user._id.toString(), user])
    );

    const mergedAppointments = appointments.map((appointment) => ({
      ...appointment.toObject(),
      userDetails: userDetailsMap.get(appointment.userId.toString()) || {},
    }));

    res.render("examiner", {
      appointments: mergedAppointments,
      error: "",
      message: "",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("examiner", { appointments: [], error: "Error fetching data" });
  }
};
