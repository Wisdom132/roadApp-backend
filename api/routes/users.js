const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user/user");

router.post("/login", userControllers.userLogin);

module.exports = router;
