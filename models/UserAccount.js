const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
let uniqueValidator = require("mongoose-unique-validator");

const SignUpModelSchema = new Schema({
  accountID: Number,
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  licenceNo: String,
  age: Number,
  userType: String,
  userName: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide username"],
  },
  carDetails: {
    make: String,
    model: String,
    year: Number,
    plateNo: String,
  },
  appointmentDate: String,
  appointmentTime: String,
  comment: String,
  pass: { type: Boolean, default: false },
  testType: { type: String, enum: ["G2", "G"] },
});

SignUpModelSchema.plugin(uniqueValidator);
SignUpModelSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const UserAccount = mongoose.model("UserAccount", SignUpModelSchema);
module.exports = UserAccount;
