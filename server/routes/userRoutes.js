const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const passport = require("../config/passport");
const { admin } = require("../middleware/auth");
router
  .route("/")
  .post(userController.createUser)
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    userController.getAllUsers
  );

router
  .route("/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    admin,
    userController.deleteUser
  );
module.exports = router;
