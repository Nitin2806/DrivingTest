const bcrypt = require("bcrypt");
const createAccountModel = require("../models/UserAccount");

module.exports = async (req, res) => {
  const { userName, password } = req.body;
  if (userName == "") {
    res.render("login", { error: "Please enter your user id or email" });
  } else if (password == "") {
    res.render("login", { error: "Please enter your Password" });
  } else {
    const findUser = await createAccountModel.findOne({ userName: userName });
    userObject = findUser;
    if (findUser === null) {
      res.render("login", { error: "Wrong email or ID" });
    } else {
      bcrypt.compare(password, findUser.password, (error, same) => {
        if (same) {
          req.session.userId = findUser._id;
          req.session.userType = findUser.userType;
          loggedIn = req.session.userId;
          userType = req.session.userType;
          console.log("Saving login", req.session);
          res.redirect("/");
        } else {
          console.error("Wrong Password");
          res.render("login", { error: "Wrong Password" });
        }
      });
    }
  }
};
