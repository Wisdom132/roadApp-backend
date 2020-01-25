const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema({
  vehicle_owner_details: {
    name: String,
    gender: String,
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
  },
  year:{
    type: Date,
    default: new Date(new Date().getYear())
  },
  expiryDate: {
    type: Date,
    default: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
