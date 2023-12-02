const fs = require("fs");

const quizFileDir = fs
  .readdirSync("../data")
  .filter((name) => name.endsWith(".js"));

let quizzes = [];

for (const file of quizFileDir) {
  const quizFile = require(`./data/${file}`);
  quizzes.push({
    title: quizFile.quizData.title,
    slug: file.replace(".js", ""),
  });
}

module.exports = async (req, res) => {
  res.render("quiz", { error: "" });
};
