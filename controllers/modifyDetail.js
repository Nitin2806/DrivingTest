const UserAccount = require("../models/UserAccount");
const BookedTimeSlot = require("../models/BookedTimeSlot");

module.exports = async (req, res) => {
  const data = req.body;
  //get accountID from global variable
  const accountID = userObject.accountID;

  if (userObject.appointmentTime !== data.timeSlot) {
    const deleteBooked = await BookedTimeSlot.deleteOne({
      date: userObject.appointmentDate,
      time: userObject.appointmentTime,
    });
  }
  try {
    // Update user details in the database
    const updateData = await UserAccount.updateOne(
      { accountID: accountID },
      {
        $set: {
          firstName: data.firstName,
          lastName: data.lastName,
          licenceNo: data.licenceNo,
          age: data.age,
          "carDetails.make": data.make,
          "carDetails.model": data.model,
          "carDetails.year": data.year,
          "carDetails.plateNo": data.plateNo,
          appointmentDate: data.date,
          appointmentTime: data.timeSlot,
        },
      }
    );
    const updateTimeSlotModel = await BookedTimeSlot.create({
      date: data.date,
      time: data.timeSlot,
    });
    if (!updateData.acknowledged && !updateTimeSlotModel.acknowledged) {
      return res.render("gtest");
    } else {
      userObject = await UserAccount.findOne({ accountID: accountID });
      res.redirect("g");
    }
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};
