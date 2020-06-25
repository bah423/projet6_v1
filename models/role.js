const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  name: { type: String, required: false }
});

module.exports = mongoose.model('role', roleSchema);