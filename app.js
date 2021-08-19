require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const myDB = require("./dbConnection/mongodb");

app.use(express.static(path.join(__dirname, "./views/css")));
app.use(express.static(path.join(__dirname, "./views/scripts")));
app.use(express.static(path.join(__dirname, "/views/svg")));

const auth = require("./config/auth");
const User = require("./models/User");

app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

myDB(() => {
  app.use(require("./routes/todoapp.routes"));
  auth(app, User);

  // ONLY STARTS LISTENING IF WE'RE CONNECTED TO DATABSE

  app.listen(3000, () => {
    console.log("Server is listening");
  });
});
