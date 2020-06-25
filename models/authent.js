const mongoose = require(mongoose);

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user");
db.user = require("./role");
db.ROLES = ["admin", "user"];

module.exports = db;
