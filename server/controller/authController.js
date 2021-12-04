const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const userService = require("../services/userService");
const mailer = require("../utils/mail");
const User = require("../models").User;

const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await userService.findUserByEmail(body.email);
    if (!user) {
      return res
        .status(400)
        .json({ msg: "This email is not associated with any account" });
    }
    if (!(await user.validPassword(body.password))) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    const token = generateToken(user.id);
    res.json({ user, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getLoggedinUser = async (req, res) => {
  try {
    console.log(req.user.id);
    const user = await userService.getUserById(req.user.id);
    // console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const resetPassword = async (req, res) => {
  console.log(process.env.email);
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) console.log(err);
      const token = buffer.toString("hex");
      const user = await userService.findUserByEmail(req.body.email);
      if (!user) {
        return res
          .status(400)
          .json({ msg: "This email is not associated with any account" });
      }
      if (!user.isAdmin) {
        return res
          .status(401)
          .send({ msg: "This email is not authorized as an admin" });
      }
      await userService.addToken(
        { resetToken: token, expireToken: Date.now() + 3600000 },
        req.body.email
      );
      mailer({
        from: "necromayhem66@gmail.com",
        to: req.body.email,
        subject: "Reset Password",
        html: `<p>You requested for password reset</p>
         <h5>Use this ${token} to reset your password</h5>`,
      });
      res.json({ msg: "Check Your Mail" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const newPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log(token);
    console.log("New Password is " + newPassword);
    const user = await userService.verifyToken(token);
    if (!user) {
      return res.status(422).json({ error: "Session expired" });
    }
    await userService.resetPassword(
      {
        password: newPassword,
        resetToken: null,
        expireToken: null,
      },
      user.id
    );
    return res.json({ msg: "password successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { login, getLoggedinUser, resetPassword, newPassword };
