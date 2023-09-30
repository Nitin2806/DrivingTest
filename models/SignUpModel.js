const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignUpModelSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: Number,
  password: String,
});

const Signup = mongoose.model("SignUpModel", SignUpModelSchema);
module.exports = Signup;
