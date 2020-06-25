const mongoose = require('mongoose');
const role = require('./role');

const userSchema = mongoose.Schema({
  userId: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role"
  }
});

module.exports = mongoose.model('user', userSchema);