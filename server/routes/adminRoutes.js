const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  crimeDetailsByUser,
  allCrimeDetails,
  allPendingReports,
  allInProgressReports,
  allRejectedReports,
  allCompletedReports,
  updateCrimeStatus,
} = require("../controller/adminController");
const passport = require("../config/passport");
const { admin } = require("../middleware/auth");

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getAllUsers);

router
  .route("/crime")
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    allCrimeDetails
  );

router
  .route("/pending")
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    allPendingReports
  );

router
  .route("/progess")
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    allInProgressReports
  );

router
  .route("/completed")
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    allCompletedReports
  );

router
  .route("/rejected")
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    allRejectedReports
  );

router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    admin,
    crimeDetailsByUser
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    admin,
    updateCrimeStatus
  )
  .delete(passport.authenticate("jwt", { session: false }), admin, deleteUser);

module.exports = router;
