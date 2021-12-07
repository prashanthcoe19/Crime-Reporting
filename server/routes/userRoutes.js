const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/userController");
const { signupValidate } = require("../validation/validator");

router.route("/").post(signupValidate, createUser);

module.exports = router;
