const connectAndRender = async (req, res) => {};

const connectAndRedirect = async (req, res) => {
  // dbData AND user ARE PASSED TO THE profile.pug AND THEN SHOWING THE INFORMATION ACCORDING TO WHAT USER IS CONNECTED ONLY SHOW THE TO-DO'S OF THAT SINGLE USER HAS MADE
  const dbData = await Task.find();
  const user = req.user;
  res.render("profile", { dbData, user: user });
};

const Task = require("../models/Task");
const User = require("../models/User");

const controller = {};

controller.get = (req, res) => {
  res.render("todoapp");
};

controller.post = async (req, res) => {
  try {
    // console.log(req.body);
    const todoName = req.body.todoname;
    const todoNameWithNoSpace = todoName.trim();

    Task.create({
      user: { username: req.user.username, password: req.user.password },
      todoname: todoNameWithNoSpace,
      todostatus: "In Progress",
    });

    res.redirect("/profile");
    // connectAndRender(req, res);
  } catch (error) {
    console.log(error);
  }
};

controller.delete = async (req, res) => {
  try {
    // console.log(req.body);
    const todoName = req.body.todoname;

    await Task.deleteOne({
      user: { username: req.user.username, password: req.user.password },
      todoname: todoName,
    });

    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

controller.put = async (req, res) => {
  try {
    // console.log(req.body);
    const todoName = req.body.todoname;
    const todoStatus = req.body.todostatus;

    await Task.updateOne({ user: { username: req.user.username, password: req.user.password }, todoname: todoName, todostatus: "In Progress" }, { $set: { todostatus: todoStatus } });

    res.redirect("/profile");
    // connectAndRender(req, res);
  } catch (error) {
    console.log(error);
  }
};

//  LOGIN/REGISTRATRION LOGIC

controller.login = (req, res) => {
  res.render("login");
};

controller.loginPost = (req, res) => {
  res.redirect("/profile");
};

controller.register = (req, res) => {
  res.render("register");
};

controller.registerPost = async (req, res, next) => {
  // console.log(req);
  const username = req.body.username;
  const usernameWithNoSpace = username.trim();

  console.log(usernameWithNoSpace + "mmm");

  await User.findOne({ username: usernameWithNoSpace }, (err, user) => {
    if (err) {
      next(err);
    } else if (user) {
      res.send(user);
    } else {
      User.create({ username: usernameWithNoSpace, password: req.body.password }, (err, data) => {
        if (err) {
          res.redirect("/login");
        } else {
          next(null, data);
        }
      });
    }
  });
};

controller.profile = (req, res) => {
  connectAndRedirect(req, res);
};

module.exports = controller;
