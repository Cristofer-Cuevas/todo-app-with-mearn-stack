const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: false,
  username: String,
  password: {},
});

const taskSchema = new mongoose.Schema({
  user: UserSchema,
  todoname: { type: String, required: true },
  todostatus: String,
});

module.exports = mongoose.model("Tasks ", taskSchema);
