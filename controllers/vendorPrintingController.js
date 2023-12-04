const BookedTimeSlotModel = require("../models/BookedTimeSlot");
const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  const driverId = req.params.id;
  const driverType = req.params.testType;
  const fetchBookingDetails = await BookedTimeSlotModel.findOne({
    userId: driverId,
  });
  const fetchDriverDetails = await UserAccount.findOne({
    _id: driverId,
  });
  let allDetails = fetchDriverDetails;
  res.render("vendor", { allDetails, error: "" });
};
