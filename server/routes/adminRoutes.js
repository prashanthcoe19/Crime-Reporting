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
  adminLoginView,
  adminRegisterView,
  adminRegister,
  adminLogin,
  adminDashboard,
  getAllCrimeReports,
} = require("../controller/adminController");
const passport = require("../config/passport");
const passportAdmin = require("../config/passportAdmin");
const { admin, auth } = require("../middleware/auth");

router.route("/dashboard").get(auth, admin, adminDashboard);

router.route("/login").get(adminLoginView).post(adminLogin);

router.route("/register").get(adminRegisterView).post(adminRegister);

router.route("/reportList").get(auth, admin, getAllCrimeReports);

router
  .route("/all")
  .get(passport.authenticate("jwt", { session: false }), getAllUsers);

// router
//   .route("/crime")
//   .get(
//     passport.authenticate("jwt", { session: false }),
//     admin,
//     allCrimeDetails
//   );

router.route("/pending").get(auth, admin, allPendingReports);

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
