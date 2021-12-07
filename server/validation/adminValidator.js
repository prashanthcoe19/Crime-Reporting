const { check, validationResult, body } = require("express-validator");
const userService = require("../services/userService");
const signup = [
  check("fullName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail(),
  body("email", "Please enter a valid email")
    .isEmail()
    .custom(async (value) => {
      let user = await userService.findUserByEmail(value);
      if (user) {
        return Promise.reject("User Already Exists");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("Password must be 8 characters"),
  check("username").notEmpty().withMessage("Username is required"),
  check("phone").notEmpty().withMessage("Phone Number is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      return res.render("../views/auth/register.ejs", {
        alert: alert,
      });
    }
    next();
  },
];

const signin = [
  body("email", "Please include a valid email")
    .isEmail()
    .custom(async (value) => {
      let user = await userService.findUserByEmail(value);
      if (!user) {
        return Promise.reject("User Doesn't Exists");
      }
      if (!user.isAdmin) {
        return Promise.reject("Unauthorized");
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      console.log(alert);
      return res.render("../views/auth/login.ejs", {
        alert: alert,
        message: " ",
      });
    }
    next();
  },
];

const email = [
  body("email", "Please include a valid email")
    .isEmail()
    .custom(async (value) => {
      let user = await userService.findUserByEmail(value);
      if (!user) {
        return Promise.reject("User Doesn't Exists");
      }
    }),
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      console.log(alert);
      return res.render("../views/auth/forgetPassword.ejs", {
        alert: alert,
      });
    }
    next();
  },
];

const passwordValidate = [
  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("Password must be 8 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      return res.render("../views/admin/changePassword.ejs", {
        alert: alert,
        message: "",
      });
    }
    next();
  },
];

const tokenPassword = [
  check("newPassword")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("Password must be 8 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      console.log(alert);
      return res.render("../views/auth/resetPassword.ejs", {
        alert: alert,
        message: " ",
      });
    }
    next();
  },
];
module.exports = { signup, signin, email, passwordValidate, tokenPassword };
