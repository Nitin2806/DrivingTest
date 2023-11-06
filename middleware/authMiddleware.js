const createAccountModel = require("../models/UserAccount");

module.exports = async (req, res, next) => {
  // console.log("1.Verifying User: AuthMiddleware");
  // console.log("2.session", req.session.userId);

  const UserDetail = await createAccountModel.findById(req.session.userId);

  console.log("authMiddleware | Details from ", UserDetail);
  if (UserDetail === null) {
    console.log("Got inside the null");
    return res.redirect("/");
  }
  next();
};
