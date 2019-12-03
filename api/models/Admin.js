const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  name: {
    type: String,
    Required: true
  },
  email: {
    type: String,
    Required: true
  },
  password: {
    type: String,
    Required: true
  }
});

module.exports = mongoose.model("Admin", adminSchema);
