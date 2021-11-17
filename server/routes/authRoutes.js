const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const passport = require("../config/passport");
// const checkAuth = require("../middleware/checkAuth");
const { admin } = require("../middleware/auth");

router
  .route("/")
  .post(authController.login)
  .get(
    passport.authenticate("jwt", { session: false }),
    authController.getLoggedinUser
  );

module.exports = router;
