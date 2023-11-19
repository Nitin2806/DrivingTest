const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  userObject = await UserAccount.findOne({ accountID: userObject.accountID });
  res.render("gtest", { user: false });
};
