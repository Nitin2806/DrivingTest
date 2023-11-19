const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  res.render("gtest", { user: false });
};
