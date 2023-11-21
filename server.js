require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("trust proxy", 1); // trust first proxy

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: "nitin crypto",
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);
app.use(flash());

// Declaring Global variables
global.loggedIn = null;
global.userType = null;
global.userObject = null;

const sessionDB = require("./models/session");

var env = process.env.NODE_ENV || "development";

console.log(env);
if (env == "development") {
  app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    userType = req.session.userType;
    next();
  });
} else {
  app.use("*", (req, res, next) => {
    loggedIn = sessionDB.userId;
    userType = sessionDB.userType;
    next();
  });
}

//---------------------------  SERVER AND DATABASE CONNECTION -----------------------------

try {
  mongoose.connect(process.env.URI);
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
//Middleware Controller
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
// View Controller
const home = require("./controllers/home");
const gTestView = require("./controllers/gtest");
const g2TestView = require("./controllers/g2test");
const loginView = require("./controllers/login");
const signUpView = require("./controllers/signUp");
const appointmentView = require("./controllers/appointmentController");
const pageNotFoundView = require("./controllers/notFound");
// Create and Modify Controllers
const createNewAccount = require("./controllers/createNewAccount");
const loginController = require("./controllers/loginUserAccount");
const modifyUserDetails = require("./controllers/modifyDetail");
const createNewUser = require("./controllers/newUser");
const findUser = require("./controllers/findUser");
const logoutController = require("./controllers/logout");
const addTimeSlot = require("./controllers/appointmentAvailability");
const checkAppointment = require("./controllers/checkAppointment");
const checkTimeSlot = require("./controllers/checkTimeSlot");

// ---------------------------- R O U T E S -------------------------------------------------

// View:Route to Home/Dashboard Page
app.get("/", home);
// View:Route to Singup Page
app.get("/signup", redirectIfAuthenticatedMiddleware, signUpView);
// View:Route to Login Page
app.get("/login", redirectIfAuthenticatedMiddleware, loginView);

// View:Route to G2 Page
app.get("/g2", authMiddleware, g2TestView);
// View:Route to G Page
app.get("/g", authMiddleware, gTestView);
//Route to Log out
app.get("/auth/logout", logoutController);
// View:Route to appointment
app.get("/appointment", authMiddleware, appointmentView);
// Controller: Route to checkappoitment dates
app.get("/checkAppointment/:date", checkAppointment);
// Controller: Route to checkappoitment slots
app.get("/checkTimeSlotAvailable/:date", checkTimeSlot);
// Route to Create new user
app.post("/license/new", createNewUser);
// Route to modify user licence Details
app.post("/edit", modifyUserDetails);
// Adding Time Slot
app.post("/admin/appointments", addTimeSlot);
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
app.get("*", pageNotFoundView);
// ---------------------------------------------------------------------------------------------
