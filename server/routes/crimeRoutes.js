const express = require("express");
const router = express.Router();
const crimeController = require("../controller/crimeController");
const { auth, admin } = require("../middleware/auth");

router
  .route("/")
  .get(auth, crimeController.loggedinUserCrimes)
  .post(auth, crimeController.createReport);

router.route("/all").get(auth, admin, crimeController.allCrimeDetails);

router
  .route("/:id")
  .get(auth, admin, crimeController.crimeDetailsByUser)
  .put(auth, admin, crimeController.updateCrimeStatus);

module.exports = router;
