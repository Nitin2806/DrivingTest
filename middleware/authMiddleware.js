const createAccountModel = require("../models/UserAccount");

module.exports = (req, res, next) => {
  createAccountModel.findById(req.session.userId, (error, user) => {
    if (error || !user) return res.redirect("/");
    next();
  });
};
