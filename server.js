const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const expressSession = require("express-session");

require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

//---------------------------  SERVER AND DATABASE CONNECTION -----------------------------

try {
  mongoose.connect(process.env.URI);
  console.log("MongoDB connected");
} catch (err) {
  console.log("Error! Failed connecting to database", err);
}

try {
  app.listen(3000, () => {
    console.log("App listening on port 3000");
  });
} catch (err) {
  console.log("Error! Failed connecting to server port 3000", err);
}

//---------------------------  C O N T R O L L E R S ---------------------------------------

const modifyUserDetails = require("./controllers/modifyDetail");
const createNewUser = require("./controllers/newUser");
const findUser = require("./controllers/findUser");
const home = require("./controllers/home");
const gtest = require("./controllers/gtest");
const g2test = require("./controllers/g2test");
const login = require("./controllers/login");
const signUp = require("./controllers/signUp");
const pageNotFound = require("./controllers/notFound");

// ---------------------------- R O U T E S ----------------------------------------------
// Route to Home/Dashboard Page
app.get("/", home);
// Route to Singup Page
app.get("/signup", signUp);
// Route to Login Page
app.get("/login", login);
// Route to G2 Page
app.get("/g2", g2test);
// Route to G Page
app.get("/g", gtest);
// create new user
app.post("/license/new", createNewUser);
//edit  user data
app.post("/edit", modifyUserDetails);
// Route to G Page
app.post("/g/license", findUser);
// Route to page not found
app.get("*", pageNotFound);
