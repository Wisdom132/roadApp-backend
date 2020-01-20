const Vehicle = require("../../models/user/Vehicle");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userLogin = async (req, res) => {
  try {
    let vehicle = await Vehicle.findOne({
      plate_number: req.body.plate_number
    });
    if (!vehicle) {
      return res.status(401).json({ error: "Vehicle not found" });
    }
    await bcrypt.compare(req.body.password, vehicle.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: "Authentification error"
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            user_details: vehicle.vehicle_owner_details,
            vehicle_details: vehicle.vehicle_information
          },
          "secret",
          { expiresIn: "240h" }
        );
        return res.status(200).json({
          role: "user",
          message: "Authentification Successful",
          token: token,
          vehicle: vehicle
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "Authentification Failed",
      error: err
    });
  }
};
