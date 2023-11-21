const bcrypt = require("bcrypt");
const createAccountModel = require("../models/UserAccount");
const sessionDB = require("../models/session");

module.exports = async (req, res) => {
  const { userName, password } = req.body;
  if (userName == "") {
    return res.render("login", { error: "Please enter your user id or email" });
  } else if (password == "") {
    return res.render("login", { error: "Please enter your Password" });
  } else {
    let findUser = await createAccountModel.findOne({ userName: userName });

    userObject = findUser;

    if (findUser === null) {
      res.render("login", { error: "Wrong email or ID" });
    } else {
      const passwordMatches = await bcrypt.compare(password, findUser.password);

      if (passwordMatches) {
        req.session.userId = findUser._id;
        req.session.userType = findUser.userType;
        await sessionDB.create({
          userId: findUser._id,
          userType: findUser.userType,
        });
        return res.redirect("/");
      } else {
        console.error("Wrong Password");
        return res.render("login", { error: "Wrong Password" });
      }
    }
  }
};
