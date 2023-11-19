module.exports = (req, res, next) => {
  console.log("redirectauthMiddleware | ID", req.session.userId);

  if (req.session.userId) {
    return res.redirect("/"); // if user logged in, redirect to home page
  }
  next();
};
