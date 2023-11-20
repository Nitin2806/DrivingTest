module.exports = (req, res) => {
  console.log("HomePage", req.session.userId, loggedIn);
  res.render("index");
};
