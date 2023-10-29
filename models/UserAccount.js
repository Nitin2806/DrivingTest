const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAccountSchema = new Schema({
  firstname: String,
  lastname: String,
  phone: Number,
  username: String,
  password: String,
});

const UserAccount = mongoose.model("UserAccount", SignUpModelSchema);
module.exports = UserAccount;
