const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SignUpModelSchema = new Schema({
  accountID: Number,
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  userType: String,
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
SignUpModelSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const UserAccount = mongoose.model("UserAccount", SignUpModelSchema);
module.exports = UserAccount;
