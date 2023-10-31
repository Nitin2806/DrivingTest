const createAccountModel = require("../models/UserAccount");

module.exports = async (req, res) => {
  const userDetails = req.body;
  const UserName = userDetails.userName;
  console.log(userDetails);
  // console.log("User Details for New Account", userDetails);

  if (
    !userDetails.firstName ||
    !userDetails.lastName ||
    !userDetails.phoneNumber ||
    !userDetails.userName ||
    !userDetails.password
  ) {
    return res.redirect("/signup");
  }

  const checkUniqueUser = await createAccountModel.findOne({
    userName: UserName,
  });

  console.log("here is uique user: ", checkUniqueUser);

  if (checkUniqueUser != null && checkUniqueUser.userName === UserName) {
    ("User already exists");
    res.render("register", { error: "User already exists" });
  } else {
    const user = await createAccountModel.findOne().sort({ accountID: -1 });
    const lastUserID = user ? user.accountID : 0; // Return 0 if there are no users yet
    const newAccountID = lastUserID + 1;
    // Add the newAccountID to the userDetails
    userDetails.accountID = newAccountID;
    try {
      const status = await createAccountModel.create(userDetails);
      console.log(status);
      res.redirect("/login");
    } catch (err) {
      console.log(err);
      res.redirect("/signup");
    }
  }
};

// Data format from client-side
//   {
//   firstName: 'Nitin',
//   lastName: 'Mishra',
//   phoneNumber: '5197818342',
//   userName: 'mnitin2311@gmail.com',
//   password: 'Iamnitin@2806',
//   confirmPassword: 'Iamnitin@2806'
//   }
