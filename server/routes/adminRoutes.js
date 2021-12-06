const express = require("express");
const router = express.Router();
const {
  adminLoginView,
  adminRegisterView,
  adminForgetPasswordView,
  adminResetPasswordView,
  adminChangePasswordView,
  adminRegister,
  adminLogin,
  adminLogout,
  adminResetPassword,
  adminForgetPassword,
  adminChangePassword,
} = require("../controller/admin/adminAuth");
const {
  adminSearchView,
  adminDashboard,
  searchCrimeByName,
  searchByCrimeType,
  crimeDetailsByUser,
  getAllCrimeReports,
  updateCrimeStatus,
  deleteReport,
  getAllUsers,
} = require("../controller/admin/adminController");

const { admin, auth } = require("../middleware/auth");
const { signup, signin } = require("../validation/adminValidator");
const { passwordValidate } = require("../validation/validator");

router.route("/dashboard").get(auth, admin, adminDashboard);

router.route("/login").get(adminLoginView).post(signin, adminLogin);

router.route("/logout").get(auth, adminLogout);

router.route("/register").get(adminRegisterView).post(signup, adminRegister);

router.route("/reportList").get(auth, getAllCrimeReports);

router
  .route("/forgetPassword")
  .get(adminForgetPasswordView)
  .post(adminForgetPassword);

router
  .route("/resetPassword")
  .get(adminResetPasswordView)
  .post(adminResetPassword);

router
  .route("/changePassword")
  .get(auth, admin, adminChangePasswordView)
  .post(auth, admin, passwordValidate, adminChangePassword);

router.route("/searchView").get(auth, admin, adminSearchView);

router.route("/searchByName").post(auth, admin, searchCrimeByName);

router.route("/searchByCrime").post(auth, admin, searchByCrimeType);

router.route("/deleteReport/:id").get(auth, admin, deleteReport);

router
  .route("/:id")
  .get(auth, admin, crimeDetailsByUser)
  .post(auth, admin, updateCrimeStatus);

module.exports = router;
