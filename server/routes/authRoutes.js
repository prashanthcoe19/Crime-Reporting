const express = require("express");
const router = express.Router();
const {
  login,
  getLoggedinUser,
  resetPassword,
  newPassword,
} = require("../controller/authController");
const passport = require("../config/passport");
// const checkAuth = require("../middleware/checkAuth");
// const { admin } = require("../middleware/auth");
const { signin, email } = require("../validation/validator");
router
  .route("/")
  .post(signin, login)
  .get(passport.authenticate("jwt", { session: false }), getLoggedinUser);

router.route("/resetPassword").post(resetPassword);

router.route("/newPassword").post(newPassword);
module.exports = router;
