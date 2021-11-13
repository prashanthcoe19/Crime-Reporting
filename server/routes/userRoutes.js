const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { auth, admin } = require("../middleware/auth");
router
  .route("/")
  .post(userController.createUser)
  .get(auth, admin, userController.getAllUsers);

router.route("/:id").delete(auth, admin, userController.deleteUser);
module.exports = router;
