const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user/User");
const Vehicle = require("../models/user/Vehicle");
const Driver = require("../models/user/Driver");
const Worthines = require("../models/user/Worthiness");
const QRCode = require("qrcode");

exports.registerNewAdmin = async (req, res) => {
  check("email", "Invalid Email Address").isEmail();
  try {
    let response = await Admin.find({ email: req.body.email });
    if (response.length >= 1) {
      res.status(400).json({ message: "Email Already Exist" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        const admin = new Admin({
          email: req.body.email,
          name: req.body.name,
          password: hash
        });

        let newAdmin = admin.save();
        // res.status(200).json({ data: newAdmin });
        res.redirect("/admin");
      });
    }
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

exports.adminLogin = (req, res) => {
  Admin.findOne({ email: req.body.email })
    .exec()
    .then(admin => {
      if (!admin) {
        res.status(401).json({ error: "Admin not found" });
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
            token: token
          });
        }
      });
    });
};

exports.registerNewUser = async (req, res) => {
  try {
    let response = await User.find({ email: req.body.email });
    if (response.length >= 1) {
      res.status(400).json({ message: "Email Already Exist" });
    } else {
      // bcrypt.hash(req.body.password, 10, (err, hash) => {
      // if (err) return res.status(500).json(err);
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
        qrcode: await QRCode.toDataURL(req.body.email)
      });

      let newuser = await user.save();
      res.status(200).json({ data: newuser });
      // });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.listAllUsers = async (req, res) => {
  try {
    let response = await User.find();
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    let userDetails = await User.findOne({ _id: id }, "_id name email qrcode");
    let userVehicles = await Vehicle.find({ userId: id });
    let driver = await Driver.find({ userId: id });
    let wothiness = await Worthines.find({ userId: id });
    res.status(200).json({
      user: { userDetails, userVehicles, driver, wothiness }
    });
  } catch (err) {
    res.status(404).json({ error: err, message: "User Not Found" });
  }
};

exports.registerUserVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle({
      userId: req.params.userId,
      company: req.body.company,
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      town: req.body.town,
      country: req.body.country,
      mobile_no: req.body.mobile_no,
      reg_no_of_Vehicle: req.body.reg_no_of_Vehicle,
      number_Etched_on_side_window: req.body.number_Etched_on_side_window,
      chassis_number: req.body.chassis_number,
      vehicle_make: req.body.vehicle_make,
      model: req.body.model,
      color: req.body.color,
      year: req.body.year,
      current_milleage: req.body.current_milleage,
      alarm_type: req.body.alarm_type,
      dealer: req.body.dealer,
      dealer_town: req.body.dealer_town,
      plate_number: req.body.plate_nunber
    });
    let response = await vehicle.save();
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.registerUserDriver = async (req, res) => {
  try {
    const driver = new Driver({
      userId: req.params.userId,
      dob: req.body.dob,
      gender: req.body.gender,
      state_of_origin: req.body.state_of_origin,
      residential_address: req.body.residential_address,
      phone: req.body.phone,
      height: req.body.height,
      facial_mask: req.body.facial_mask,
      blood_group: req.body.blood_group,
      geneotype: req.body.geneotype,
      disabilities: req.body.disabilities
    });
    let newDriver = await driver.save();
    res.status(200).json({ driver: newDriver });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.registerUsersWorthiness = async (req, res) => {
  try {
    let worthines = new Worthines({
      userId: req.params.userId,
      given_name: req.body.given_name,
      acn: req.body.Acn,
      main_road: req.body.Main_raod,
      business_address: req.body.business_address,
      post_code: req.body.post_code,
      year: req.body.year,
      make: req.body.make,
      vehicle_type: req.body.vehicle_type,
      model: req.body.model,
      engine_no: req.body.engine_no,
      classic_number: req.body.classic_number,
      compliance_number: req.body.compliance_number,
      plate_no: req.body.plate_no
    });
    let response = await worthines.save();
    res.status(200).json({ data: response });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    let email = req.body.email;
    let response = await User.findOne({ email: email });
    // if (!response) {
    //   res.status(404).json({ error: "User Not found" });
    // } else {
    res.status(200).json({ data: response });
    // }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
