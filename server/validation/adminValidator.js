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
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Enter Valid Password"),
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

const report = [
  check("crimeType").notEmpty("This field cannot be empty"),
  check("description").notEmpty("This field cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const email = [
  check("email", "Please include valid email")
    .isEmail()
    .notEmpty()
    .withMessage("Email is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
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
module.exports = { signup, signin, report, email, passwordValidate };
