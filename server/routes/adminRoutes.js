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
  adminForgetPasswordView,
  adminResetPasswordView,
  adminForgetPassword,
  adminResetPassword,
  searchCrimeByName,
  searchByCrimeType,
} = require("../controller/adminController");
const passport = require("../config/passport");
// const passportAdmin = require("../config/passportAdmin");
const { admin, auth } = require("../middleware/auth");

router.route("/dashboard").get(auth, admin, adminDashboard);

router.route("/login").get(adminLoginView).post(adminLogin);

router.route("/register").get(adminRegisterView).post(adminRegister);

router.route("/reportList").get(auth, getAllCrimeReports);

router
  .route("/forgetPassword")
  .get(adminForgetPasswordView)
  .post(adminForgetPassword);

router
  .route("/resetPassword")
  .get(adminResetPasswordView)
  .post(adminResetPassword);

router.route("/searchByName").post(auth, admin, searchCrimeByName);

router.route("/searchByCrime").post(auth, admin, searchByCrimeType);
// router
//   .route("/all")
//   .get(passport.authenticate("jwt", { session: false }), getAllUsers);

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
  .get(auth, admin, crimeDetailsByUser)
  .post(auth, admin, updateCrimeStatus)
  .delete(auth, admin, deleteUser);

module.exports = router;
