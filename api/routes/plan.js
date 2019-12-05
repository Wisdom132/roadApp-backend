const express = require("express");
const router = express.Router();

const planController = require("../controllers/plan");

router.post("/create-plan", planController.createNewPlan);
router.get("/get-plan", planController.listAllPlans);

module.exports = router;
