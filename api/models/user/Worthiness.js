const mongoose = require("mongoose");
const worthinessSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  given_name: String,
  Acn: String,
  Main_raod: String,
  business_address: String,
  post_code: String,
  year: String,
  make: String,
  vehicle_type: String,
  model: String,
  engine_no: String,
  classic_number: String,
  compliance_number: String,
  plate_no: String
});

module.exports = mongoose.model("Worthiness", worthinessSchema);
