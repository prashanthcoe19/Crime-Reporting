const express = require("express");
const router = express.Router();
const {
  login,
  getLoggedinUser,
  resetPassword,
  newPassword,
  changePassword,
} = require("../controller/authController");
const passport = require("../config/passport");
const {
  signinValidate,
  passwordValidate,
  emailValidate,
} = require("../validation/validator");
router
  .route("/")
  .post(signinValidate, login)
  .get(passport.authenticate("jwt", { session: false }), getLoggedinUser);

router.route("/resetPassword").post(emailValidate, resetPassword);

router.route("/newPassword").post(newPassword);

router
  .route("/changePassword")
  .put(
    passport.authenticate("jwt", { session: false }),
    passwordValidate,
    changePassword
  );
module.exports = router;
