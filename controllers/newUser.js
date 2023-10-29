const UserModel = require("../models/UserModel");

module.exports = async (req, res) => {
  // console.log(req.body);
  await UserModel.create(req.body);
  res.render("index");
};
