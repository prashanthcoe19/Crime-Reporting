const userService = require("../../services/userService");
const generateToken = require("../../utils/generateToken");
const mailer = require("../../utils/mail");
const crypto = require("crypto");

const adminLoginView = (req, res) => {
  res.render("../views/auth/login.ejs", {
    message: " ",
  });
};

const adminRegisterView = (req, res) => {
  res.render("../views/auth/register.ejs");
};

const adminForgetPasswordView = (req, res) => {
  res.render("../views/auth/forgetPassword.ejs");
};

const adminResetPasswordView = (req, res) => {
  res.render("../views/auth/resetPassword.ejs", {
    message: " ",
  });
};

const adminChangePasswordView = (req, res) => {
  res.render("../views/admin/changePassword.ejs", {
    user: req.user,
    title: "Change Password",
    message: " ",
  });
};

const adminLogout = async (req, res) => {
  try {
    console.log("Here");
    res.clearCookie("jwt");
    res.redirect("/api/admin/login");
  } catch (err) {
    console.log(err);
  }
};
const adminRegister = async (req, res) => {
  const { fullName, email, password, phone, username } = req.body;
  try {
    let admin = await userService.findUserByEmail(email);
    // console.log(admin);
    if (admin) {
      console.error("User already exists");
    }
    admin = await userService.createUser({
      fullName,
      email,
      password,
      username,
      phone,
      isAdmin: true,
    });
    if (admin) {
      res.redirect("/api/admin/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const maxAge = 3 * 24 * 60 * 60;

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.redirect("/api/admin/login");
    }
    if (!(await user.validPassword(password))) {
      return res.render("../views/auth/login.ejs", {
        message: "Invalid Password",
      });
    }
    const token = generateToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/api/admin/dashboard");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const adminForgetPassword = async (req, res) => {
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
      res.redirect("/api/admin/resetPassword");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const adminResetPassword = async (req, res) => {
  console.log(req.body);
  try {
    const { token, newPassword } = req.body;

    console.log(token);
    console.log("New Password is " + newPassword);
    const user = await userService.verifyToken(token);
    if (!user) {
      return res.render("../views/auth/resetPassword", {
        message: "Token Invalid or Expired",
      });
    }
    await userService.resetPassword(
      {
        password: newPassword,
        resetToken: null,
        expireToken: null,
      },
      user.id
    );
    res.redirect("/api/admin/login");
    // return res.json({ msg: "password successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const adminChangePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  try {
    let user = await userService.getUserById(req.user.id);
    if (!(await user.validPassword(password))) {
      return res.render("../views/admin/changePassword", {
        message: "Invalid Password",
      });
    }
    await userService.editUser(
      {
        password: newPassword,
      },
      req.user.id
    );
    return res.redirect("/api/admin/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
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
};
