require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressSession = require("express-session");

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

// Declaring Global variables
global.loggedIn = null;
global.userType = null;
global.userObject = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  userType = req.session.userType;
  next();
});

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
    console.log("Server connected to port 3000");
  });
} catch (err) {
  console.log("Error! Failed connecting to server on port 3000", err);
}

//----------------------------- C O N T R O L L E R S ---------------------------------------

const modifyUserDetails = require("./controllers/modifyDetail");
const createNewUser = require("./controllers/newUser");
const findUser = require("./controllers/findUser");
const home = require("./controllers/home");
const gTest = require("./controllers/gtest");
const g2Test = require("./controllers/g2test");
const login = require("./controllers/login");
const signUp = require("./controllers/signUp");
const pageNotFound = require("./controllers/notFound");
const createNewAccount = require("./controllers/createNewAccount");
const loginController = require("./controllers/loginUserAccount");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("./controllers/logout");

// ---------------------------- R O U T E S -------------------------------------------------

// Route to Home/Dashboard Page
app.get("/", home);
// Route to Singup Page
app.get("/signup", redirectIfAuthenticatedMiddleware, signUp);
// Route to Login Page
app.get("/login", redirectIfAuthenticatedMiddleware, login);
// Route to G2 Page
app.get("/g2", authMiddleware, g2Test);
// Route to G Page
app.get("/g", authMiddleware, gTest);
//Route to Log out
app.get("/auth/logout", logoutController);
// Route to Create new user
app.post("/license/new", createNewUser);
// Route to modify user licence Details
app.post("/edit", modifyUserDetails);
// Route to G Page
app.post("/g/license", findUser);
// Route to create new signup account
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  createNewAccount
);
// Route to  login controller
app.post("/users/login", redirectIfAuthenticatedMiddleware, loginController);
// Route to page not found
app.get("*", pageNotFound);
// ---------------------------------------------------------------------------------------------
