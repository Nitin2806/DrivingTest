const createAccountModel = require("../models/UserAccount");

module.exports = async (req, res, next) => {
  const UserDetail = await createAccountModel.findById(req.session.userId);
  loggedIn = req.session.userId;
  if (UserDetail === null) {
    return res.redirect("/");
  }
  next();
};
