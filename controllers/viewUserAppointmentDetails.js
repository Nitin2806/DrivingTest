const BookedTimeSlotModel = require("../models/BookedTimeSlot");
const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  try {
    const userId = req.params.id;
    const driverDetails = await UserAccount.findOne({
      _id: userId,
    });
    res.render("viewUserAppointment", { driverDetails, error: "" });
  } catch (err) {
    console.log(err);
  }
};
