const express = require("express");
const router = express.Router();

const admincontroller = require("../controllers/admin");

//routes to controllers
router.post("/register", admincontroller.registerNewAdmin);
router.post("/login", admincontroller.adminLogin);
router.get("/list-admins", admincontroller.getAllAdmins);
router.post("/registeruser", admincontroller.registerNewUser);
router.get("/list-users", admincontroller.listAllUsers);
router.get("/user/:userId", admincontroller.getUserById);

router.post("/registervehicle/:userId", admincontroller.registerUserVehicle);
router.post("/registerDriver/:userId", admincontroller.registerUserDriver);
router.post(
  "/registerWorthines/:userId",
  admincontroller.registerUsersWorthiness
);
module.exports = router;
