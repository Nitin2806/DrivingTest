const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  try {
    const driverId = req.params.id;
    const driverReview = req.body;
    console.log(driverId, driverReview);
    let qualified = null;
    if (driverReview.passFail == "on") {
      qualified = true;
    } else {
      qualified = false;
    }

    await UserAccount.updateOne(
      { _id: driverId },
      {
        $set: {
          comment: driverReview.comment,
          pass: qualified,
        },
      }
    );
    userObject = await UserAccount.findOne({ _id: driverId });

    res.render("examiner", {
      appointments: examinerdriverObject,
      message: "User Data Updated",
    });
  } catch (err) {
    console.log(err);
  }
};
