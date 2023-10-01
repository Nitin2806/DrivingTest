const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");
const URI = "mongodb+srv://mnitin2311:Iamnitin@cluster0.yp1u0bv.mongodb.net/";

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");

try {
  mongoose.connect(URI);
  console.log("MongoDB connected");
} catch {
  console.log("Error! Failed connecting to database");
}

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

// Route to Home/Dashboard Page
app.get("/", (req, res) => {
  res.render("index");
});

// Route to G2 Page
app.get("/g2", (req, res) => {
  res.render("g2test");
});

// Route to post G2 form data
app.post("/license/new", async (req, res) => {
  // console.log(req.body);
  await UserModel.create(req.body);
  res.render("index");
});

// Route to G Page
app.get("/g", async (req, res) => {
  res.render("gtest");
});
// Route to G Page
app.post("/g/license", async (req, res) => {
  // console.log(req.body.LicenseNo);

  try {
    const licenseNo = req.body.LicenseNo;

    if (!licenseNo) {
      return res.status(400).send("License Number is required.");
    }

    const user = await UserModel.findOne({ LicenseNo: licenseNo });

    if (!user) {
      return res.status(404).send("User not found");
    }

    console.log("Found USER DATA", user);

    // Assuming 'gtest' is a template that you are rendering
    res.render("userInfo", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

// Route to Singup Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Route to page not found
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found!");
});
