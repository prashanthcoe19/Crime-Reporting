const express = require("express");
const router = express.Router();
const { createUser, updateUser } = require("../controller/userController");
const { signup } = require("../validation/validator");
const passport = require("../config/passport");

router.route("/").post(signup, createUser);

module.exports = router;
