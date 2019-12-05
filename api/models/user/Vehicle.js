const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  company: String,
  address_1: String,
  address_2: String,
  town: String,
  country: String,
  mobile_no: String,
  reg_no_of_Vehicle: String,
  number_Etched_on_side_window: Number,
  chassis_number: Number,
  vehicle_make: String,
  model: String,
  color: String,
  year: String,
  current_milleage: String,
  alarm_type: String,
  dealer: String,
  dealer_town: String,
  plate_number: String
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
