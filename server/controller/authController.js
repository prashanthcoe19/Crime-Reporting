const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const userService = require("../services/userService");
const User = require("../models").User;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.api_key,
    },
  })
);

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
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const resetPassword = async (req, res) => {
  console.log(process.env.api_key);
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
      await User.update(
        { resetToken: token, expireToken: Date.now() + 3600000 },
        {
          where: { email: req.body.email },
        }
      );
      await transporter.sendMail({
        to: req.body.email,
        from: "necromayhem66@gmail.com",
        subject: "Reset Password",
        html: `<p>You requested for password reset</p>
         <h5> Click in this link <a href="http://localhost.${process.env.PORT}/api/auth/resetPassword/${token}">link</a> 
         to reset password</h5>`,
      });
      res.json({ message: "Check Your Mail" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const newPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user) {
      return res.status(422).json({ error: "Session expired" });
    }
    await User.update(
      {
        password: newPassword,
        resetToken: null,
        expireToken: null,
      },
      {
        where: {
          id: user.id,
        },
        individualHooks: true,
      }
    );
    res.json({ message: "password successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { login, getLoggedinUser, resetPassword, newPassword };
