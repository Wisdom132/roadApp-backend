const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
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
  },
  qrcode: String
});

module.exports = mongoose.model("User", userSchema);
