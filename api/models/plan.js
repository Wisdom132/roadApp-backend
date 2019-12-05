const mongoose = require("mongoose");
const planschema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  amount: {
    type: String,
    require: true
  },
  interval: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Plan", planschema);
