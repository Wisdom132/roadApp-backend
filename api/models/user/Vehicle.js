const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema({
  vehicle_owner_details: {
    name: String,
    phone_number: String,
    address: String,
    state: String,
    lga: String,
    nationality: String
  },
  vehicle_information: {
    vehicle_make: String,
    vehicle_model: String,
    vehicle_production_year: String,
    vehicle_class: String,
    vehicle_engine_number: String,
    vehicle_color: String,
    chassic_number: Number,
    registration_state: String,
    registration_lga: String,
    MV_reg: Number
  },
  password: {
    type: String,
    required: true
  },
  plate_number: String,
  qrcode: String,
  dateIssued: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
