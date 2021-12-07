const { check, validationResult } = require("express-validator");

const signupValidate = [
  check("fullName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username can not be empty!")
    .bail(),
  check("email", "Please include a valid email address.").isEmail(),
  check("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("Password must be 8 characters"),
  check("username").notEmpty(),
  check("phone").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const signinValidate = [
  check("email", "Please include a valid email.").isEmail(),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be 8 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const reportValidate = [
  check("crimeType").notEmpty().withMessage("This field cannot be empty"),
  check("description").notEmpty().withMessage("This field cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const emailValidate = [
  check("email", "Please include valid email")
    .isEmail()
    .notEmpty()
    .withMessage("Email is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
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
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
module.exports = {
  signupValidate,
  signinValidate,
  reportValidate,
  emailValidate,
  passwordValidate,
};
