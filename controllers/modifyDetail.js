const UserAccount = require("../models/UserAccount");
const BookedTimeSlot = require("../models/BookedTimeSlot");

module.exports = async (req, res) => {
  const data = req.body;
  console.log(data);
  //get accountID from global variable
  const accountID = userObject.accountID;
  if (userObject.appointmentTime !== data.timeSlot) {
    await BookedTimeSlot.deleteOne({
      date: userObject.appointmentDate,
      time: userObject.appointmentTime,
    });
  }
  if (data.testType == "G") {
    const updateData = await UserAccount.updateOne(
      { accountID: accountID },
      {
        $set: {
          appointmentDate: data.Gdate,
          appointmentTime: data.timeSlot,
          testType: data.testType,
        },
      }
    );

    const updateTimeSlotModel = await BookedTimeSlot.create({
      date: data.Gdate,
      time: data.timeSlot,
      userId: req.session.userId,
      isTimeSlotAvailable: true,
      testType: data.testType,
    });
    if (!updateData.acknowledged && !updateTimeSlotModel.acknowledged) {
      return res.render("g");
    } else {
      userObject = await UserAccount.findOne({ accountID: accountID });
      res.redirect("g");
    }
  } else {
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
            appointmentDate: data.G2date,
            appointmentTime: data.timeSlot,
            testType: data.testType,
          },
        }
      );

      const updateTimeSlotModel = await BookedTimeSlot.create({
        date: data.G2date,
        time: data.timeSlot,
        userId: req.session.userId,
        isTimeSlotAvailable: true,
        testType: data.testType,
      });

      if (!updateData.acknowledged && !updateTimeSlotModel.acknowledged) {
        return res.render("g2");
      } else {
        userObject = await UserAccount.findOne({ accountID: accountID });
        res.redirect("g2");
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  }
};
