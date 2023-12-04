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
    console.log("Check user status", qualified);
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

    userObject = await UserAccount.findOne({ _id: driverId });

    res.render("examiner", {
      appointments: examinerdriverObject,
      message: "User Data Updated",
    });
  } catch (err) {
    console.log(err);
  }
};
