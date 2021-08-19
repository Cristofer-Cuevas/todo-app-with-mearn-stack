const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: {},
  status: String,
});

module.exports = mongoose.model("users", UserSchema);
