const express = require("express");
const router = express.Router();

const admincontroller = require("../controllers/admin");

//routes to controllers
router.post("/register", admincontroller.registerNewAdmin);
router.post("/login", admincontroller.adminLogin);
router.get("/list-admins", admincontroller.getAllAdmins);
router.post("/registervehicle", admincontroller.registerNewVehicle);
router.get("/list-vehicles", admincontroller.listAllVehicles);
router.get("/vehicle/:vehicleId", admincontroller.getVehilcleDetailsById);
router.post("/get-by-platenumber", admincontroller.getUserByPlateNumber);


//get metrics
router.get("/get-vehicle-metrics",admincontroller.getTransactionMatrics)
router.put("/renew-vehicle/:vehicleId",admincontroller.updateVehicle)

module.exports = router;
