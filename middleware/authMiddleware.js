const createAccountModel = require("../models/UserAccount");

module.exports = async (req, res, next) => {
  const UserDetail = await createAccountModel.findById(req.session.userId);
  console.log("authMiddleware", req.session.userId);
  if (UserDetail === null) {
    console.log("authMiddleware |", UserDetail);
    return res.redirect("/");
  }
  next();
};
