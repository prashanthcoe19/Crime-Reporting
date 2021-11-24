const express = require("express");
const router = express.Router();
const {
  createReport,
  loggedinUserCrimes,
  getPendingReports,
  getInProgressReports,
  getCompletedReports,
  getRejectedReports,
} = require("../controller/crimeController");

// const crimeController = require("../controller/crimeController");
const passport = require("../config/passport");

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), loggedinUserCrimes)
  .post(passport.authenticate("jwt", { session: false }), createReport);

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

module.exports = router;
