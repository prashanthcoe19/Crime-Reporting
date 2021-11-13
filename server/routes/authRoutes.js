const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { auth } = require("../middleware/auth");

router
  .route("/")
  .post(authController.login)
  .get(auth, authController.getLoggedinUser);

module.exports = router;
