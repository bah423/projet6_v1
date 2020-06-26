const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: String,
    email: String,
    password: String,
    role: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
  })
);

module.exports = User;