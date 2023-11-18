const UserModel = require("../models/UserModel");

module.exports = async (req, res) => {
  await UserModel.create(req.body);
  res.render("index");
};
