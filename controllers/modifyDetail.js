const UserModel = require("../models/UserModel");

module.exports = async (req, res) => {
  const data = req.body;
  const license = data.licenseNo;
  // const UserData = await UserModel.findOne({
  //   LicenseNo: license,
  // });
  // console.log(UserData);
  try {
    const updateData = await UserModel.updateOne(
      { LicenseNo: license },
      {
        $set: {
          "carDetails.make": data.make,
          "carDetails.model": data.model,
          "carDetails.year": data.year,
          "carDetails.plateno": data.plateno,
        },
      }
    );
    // console.log(updateData);
    if (!updateData.acknowledged) {
      console.log("Data not updated");
      return res.status(404).render("gtest");
    } else {
      res.redirect("g");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    // Handle the error appropriately (e.g., send an error response)
    res.status(500).send("Internal Server Error");
  }
};
