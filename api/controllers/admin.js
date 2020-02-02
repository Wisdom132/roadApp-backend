const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Vehicle = require("../models/user/Vehicle");
const QRCode = require("qrcode");
let generateThreeRandomNumbers = (min, max) => {
  let digits;
  for (var i = 0; i < 3; i++) {
    digits = Math.floor(Math.random() * max) + min;
  }
  return parseInt(digits);
};

let generateFirstTwoLetters = () => {
  var text = "";
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 2; i++) {
    text += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return text;
};

exports.registerNewAdmin = async (req, res) => {
  try {
    let response = await Admin.find({ email: req.body.email });
    if (response.length >= 1) {
      return res.status(400).json({ message: "Email Already Exist" });
    }
    const admin = new Admin({
      email: req.body.email,
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 10)
    });

    let newAdmin = await admin.save();
    res.status(200).json({ data: newAdmin });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    let response = await Admin.find();
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getTransactionMatrics = async (req,res) => {
  try {
  let vehicle = await Vehicle.count();
  let dt = new Date(new Date().getYear());
  let almostexpired = await Vehicle.find({year:dt})
  let expired = await Vehicle.find({expiryDate: Date.now()})
  res.status(200).json({allvehicles:vehicle,almostexpired:almostexpired.length,expired:expired.length})
  }catch(err) {
      console.log(err)
      res.status(500).json({message:"Something went wrong",error:err})
  }
}

exports.adminLogin = (req, res) => {
  Admin.findOne({ email: req.body.email })
    .exec()
    .then(admin => {
      if (!admin) {
       return res.status(401).json({ error: "Admin not found" });
      }
      bcrypt.compare(req.body.password, admin.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            error: "Authentification error"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: admin.email,
              name: admin.name,
              id: admin._id
            },
            "secret",
            { expiresIn: "240h" }
          );

          return res.status(200).json({
            message: "Authentification Successful",
            role: "admin",
            token: token
          });
        }
      });
    });
};

exports.registerNewVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle({
      vehicle_owner_details: {
        name: req.body.name,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        address: req.body.address,
        state: req.body.state,
        lga: req.body.lga,
        nationality: req.body.nationality
      },
      vehicle_information: {
        vehicle_make: req.body.vehicle_make,
        vehicle_model: req.body.vehicle_model,
        vehicle_production_year: req.body.vehicle_production_year,
        vehicle_class: req.body.vehicle_class,
        vehicle_engine_number: req.body.vehicle_engine_number,
        vehicle_color: req.body.vehicle_color,
        chassic_number: req.body.chassic_number,
        registration_state: req.body.registration_state,
        registration_lga: req.body.registration_lga,
        MV_reg: req.body.mv_reg,
        insurance:req.body.insurance
      },
      plate_number: `${req.body.registration_lga.substring(
        0,
        3
      )}-${generateThreeRandomNumbers(0, 999)}-${generateFirstTwoLetters()}`,
      password: await bcrypt.hash(req.body.password, 10),
    });
   vehicle.qrcode= await QRCode.toDataURL(vehicle.plate_number)
    let newvehicle = await vehicle.save();
    res.status(200).json({ data: newvehicle});
  } catch (err) {
    res.status(400).json({ error: err });
    console.log(err);
  }
};

exports.listAllVehicles = async (req, res) => {
  try {
    let response = await Vehicle.find();
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getVehilcleDetailsById = async (req, res) => {
  try {
    const id = req.params.vehicleId;
    let vehicleDetails = await Vehicle.findOne({ _id: id });
    res.status(200).json({
      details: { vehicleDetails }
    });
  } catch (err) {
    res.status(404).json({ error: err, message: "User Not Found" });
  }
};

exports.getUserByPlateNumber = async (req, res) => {
  try {
    let plateNumber = req.body.plate_number;
    let response = await Vehicle.findOne({ plate_number: plateNumber });
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateVehicle = async (req,res) => {
  try {
    let id = req.params.vehicleId;
    let update = await Vehicle.findByIdAndUpdate(id,{$set:{
      dateIssued:req.body.dateIssued,
      expiryDate:req.body.expiryDate,
      year:req.body.year
    }})
    let updatedVehicle = await update.save()
    res.status(200).json({updated:updatedVehicle})

  }catch(err){
    console.log(err)
    res.status(500).json({ error: err });
  }
}

 exports.updateAllDetails = async (req,res) => {
    try {
      let update = await Vehicle.findByIdAndUpdate(id,req.body);
      let latestInfo = await update.save();
      res.status(200).json({updated:latestInfo})
    }catch(err) {
      console.log(err)
    res.status(500).json({ error: err });
    }
  }