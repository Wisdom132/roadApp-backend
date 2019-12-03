const mongoose = require("mongoose");
const driverSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  dob: String,
  gender: String,
  state_of_origin: String,
  residential_address: String,
  phone: String,
  height: String,
  facial_mask: String,
  blood_group: String,
  geneotype: String,
  disabilities: String
  //   picture: String
});

module.exports = mongoose.model("Driver", driverSchema);
