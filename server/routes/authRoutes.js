const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const passport = require("../config/passport");
const checkAuth = require("../middleware/checkAuth");
const { auth } = require("../middleware/auth");

router
  .route("/")
  .post(passport.authenticate("local"), authController.login)
  .get(checkAuth, authController.getLoggedinUser);

module.exports = router;
