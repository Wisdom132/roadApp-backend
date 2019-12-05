const Plan = require("../models/plan");
const paystack = require("paystack-api")(
  "sk_test_6817f2f06e03db86f1e70b759db78ff75be43716"
);

exports.createNewPlan = (req, res) => {
  const plan = new Plan({
    name: req.body.name,
    amount: req.body.amount,
    interval: req.body.interval
  });
  plan.save((err, data) => {
    if (err) {
      req.status(500).json({ error: err });
    }
    console.log(data);
    if (data) {
      paystack.plan
        .create({
          name: data.name,
          amount: data.amount * 100,
          interval: data.interval
        })
        .then(response => {
          res.status(200).json({ response: response });
        })
        .catch(err => {});
    }
  });
};

exports.listAllPlans = async (req, res) => {
  try {
    let response = await paystack.plan.list();
    res.status(200).json({ plan: response });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
