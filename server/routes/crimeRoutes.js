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

router
  .route("/:id")
  .put(passport.authenticate("jwt", { session: false }), updateReport);
module.exports = router;
