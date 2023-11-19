module.exports = (req, res) => {
  console.log("authMiddleware |", req.session);

  res.render("g2test");
};
