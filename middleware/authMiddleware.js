const createAccountModel = require("../models/UserAccount");

const authUserMiddleware = async (req, res, next) => {
  const UserDetail = await createAccountModel.findById(req.session.userId);
  if (UserDetail === null) {
    return res.redirect("/");
  }
  next();
};

const examinarMiddleware = async (req, res, next) => {
  const UserDetail = await createAccountModel.findById(req.session.userId);
  if (UserDetail === null) {
    return res.redirect("/");
  } else if (UserDetail.userType != "examiner") {
    return res.render("/", { error: "You do not have access to this page" });
  }
  next();
};

module.exports = { authUserMiddleware, examinarMiddleware };
