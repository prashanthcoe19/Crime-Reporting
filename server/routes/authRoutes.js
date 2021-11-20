const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const passport = require("../config/passport");
// const checkAuth = require("../middleware/checkAuth");
// const { admin } = require("../middleware/auth");
const { signin } = require("../validation/validator");
router
  .route("/")
  .post(signin, authController.login)
  .get(
    passport.authenticate("jwt", { session: false }),
    authController.getLoggedinUser
  );

module.exports = router;
