const User = require("../../models/user/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userLogin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({ error: "User not found" });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            error: "Authentification error"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              name: user.name,
              id: user._id
            },
            "secret",
            { expiresIn: "240h" }
          );
          //   return res.redirect("/admin/dashboard");

          return res.status(200).json({
            message: "Authentification Successful",
            token: token
          });
        }
      });
    });
};
