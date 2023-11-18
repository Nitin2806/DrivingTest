const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  const data = req.body;
  const accountID = userObject.accountID;
  try {
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
        },
      }
    );
    if (!updateData.acknowledged) {
      return res.status(404).render("gtest");
    } else {
      res.redirect("g");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
};
