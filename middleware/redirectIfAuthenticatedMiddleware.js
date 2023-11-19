module.exports = (req, res, next) => {
  console.log(req.session);
  if (req.session.userId) {
    return res.redirect("/"); // if user logged in, redirect to home page
  }
  next();
};
