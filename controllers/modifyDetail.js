const UserModel = require("../models/UserModel");

module.exports = async (req, res) => {
  const data = req.body;
  const license = data.licenseNo;
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
