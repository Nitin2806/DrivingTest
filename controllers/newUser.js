const UserAccount = require("../models/UserAccount");

module.exports = async (req, res) => {
  await UserAccount.create(req.body);
  res.render("index");
};
