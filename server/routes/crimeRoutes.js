const express = require("express");
const router = express.Router();
const {
  createReport,
  loggedinUserCrimes,
  getPendingReports,
  getInProgressReports,
  getCompletedReports,
  getRejectedReports,
  updateReport,
  searchByCrimeType,
} = require("../controller/crimeController");

const passport = require("../config/passport");
const { reportValidate } = require("../validation/validator");

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), loggedinUserCrimes)
  .post(
    passport.authenticate("jwt", { session: false }),
    reportValidate,
    createReport
  );

router
  .route("/searchByCrime")
  .post(passport.authenticate("jwt", { session: false }), searchByCrimeType);

router
  .route("/pending")
  .get(passport.authenticate("jwt", { session: false }), getPendingReports);

router
  .route("/completed")
  .get(passport.authenticate("jwt", { session: false }), getCompletedReports);

router
  .route("/progress")
  .get(passport.authenticate("jwt", { session: false }), getInProgressReports);

router
  .route("/rejected")
  .get(passport.authenticate("jwt", { session: false }), getRejectedReports);

router
  .route("/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    reportValidate,
    updateReport
  );
module.exports = router;
