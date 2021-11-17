const express = require("express");
const router = express.Router();
const crimeController = require("../controller/crimeController");
const passport = require("../config/passport");
const { admin } = require("../middleware/auth");

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    crimeController.loggedinUserCrimes
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    crimeController.createReport
  );

router
  .route("/all")
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    crimeController.allCrimeDetails
  );

router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    crimeController.crimeDetailsByUser
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    admin,
    crimeController.updateCrimeStatus
  );

module.exports = router;
