const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

const express = require("express");
const passport = require("passport");

const router = express.Router();

const controller = require("../controller/todoapp.controllers");

router.get("/", controller.get);

router.post("/profileform", controller.post);

router.delete("/profileform", controller.delete);

router.put("/profileform", controller.put);

router.get("/login", controller.login);

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), controller.loginPost);

router.post("/register", controller.registerPost, passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  res.redirect("/profile");
});

router.get("/register", controller.register);

router.get("/profile", ensureAuthenticated, controller.profile);

module.exports = router;
