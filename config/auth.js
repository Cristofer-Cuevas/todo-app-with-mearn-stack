const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports = (app, User) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(null, user);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      const usernameWithNoSpace = username.trim();

      User.findOne({ username: usernameWithNoSpace }, (err, user) => {
        console.log(`User ${usernameWithNoSpace} attempted te log in`);
        if (err) {
          return done(err);
        } else if (!user) {
          return done(null, false);
        } else if (password != user.password) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    })
  );
};
