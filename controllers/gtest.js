const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  console.log("gtest | before fetch", userObject);
  userObject = await UserAccount.findOne({ accountID: userObject.accountID });
  console.log("gtest | Again ", userObject);

  res.render("gtest", { user: false });
};
