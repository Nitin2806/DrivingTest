module.exports = async (req, res) => {
  try {
    const licenseNo = req.body.LicenseNo;
    if (!licenseNo) {
      return res.status(400).send("License Number is required.");
    }
    const user = await UserModel.findOne({ LicenseNo: licenseNo });
    if (!user) {
      return res.status(404).render("userNotFound");
    }
    res.render("gtest", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
