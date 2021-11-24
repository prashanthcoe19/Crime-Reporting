const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/userController");
const { signup } = require("../validation/validator");

router.route("/").post(signup, createUser);

module.exports = router;
