const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = {
  userId: String,
  userType: String,
};

const session = mongoose.model("session", sessionSchema);
module.exports = session;
