const bcrypt = require("bcrypt");
const createAccountModel = require("../models/UserAccount");

module.exports = async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);

  const findUser = await createAccountModel.findOne({ userName: userName });
  console.log("User", findUser);

  if (findUser) {
    bcrypt.compare(password, findUser.password, (error, same) => {
      if (same) {
        req.session.userId = findUser._id;
        console.log("User Found");

        res.redirect("/");
      } else {
        console.log("Wrong");
        res.redirect("login", { error: "Wrong Password" });
      }
    });
  }
};
