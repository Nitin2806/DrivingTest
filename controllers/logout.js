const session = require("../models/session");

module.exports = (req, res) => {
  session.findOneAndDelete({
    userId: session.userId,
  });
  req.session.destroy(() => {
    res.redirect("/");
  });
};
