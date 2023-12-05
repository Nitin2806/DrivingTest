const BookedTimeSlotModel = require("../models/BookedTimeSlot");
const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  try {
    const driverId = req.params.id;
    const driverTestType = req.params.testType;

    const driverReview = req.body;
    let qualified = null;
    if (driverReview.passFail == "on") {
      qualified = true;
    } else {
      qualified = false;
    }
    if (qualified === false) {
      await UserAccount.updateOne(
        { _id: driverId },
        {
          $set: {
            comment: driverReview.comment,
            pass: qualified,
          },
        }
      );
    } else {
      await UserAccount.updateOne(
        { _id: driverId },
        {
          $set: {
            comment: driverReview.comment,
            pass: qualified,
            qualified: driverTestType,
          },
        }
      );
    }

    const appointments = await BookedTimeSlotModel.find();

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
      message: "User Data Updated",
    });
  } catch (err) {
    console.log(err);
  }
};
