const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModelSchema = new Schema({
  firstname: String,
  lastname: String,
  LicenseNo: String,
  Age: Number,
  dob: String,
  carDetails: {
    make: String,
    model: String,
    year: Number,
    plateno: String,
  },
});
const UserModel = mongoose.model("UserModel", UserModelSchema);
module.exports = UserModel;
