module.exports = (req, res) => {
  console.log("Home", req.session);
  res.render("index");
};
