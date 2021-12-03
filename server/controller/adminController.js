const adminService = require("../services/adminService");
const userService = require("../services/userService");
const crimeService = require("../services/crimeService");
const generateToken = require("../utils/generateToken");
const moment = require("moment");
//view pages for admin login and register
const adminLoginView = (req, res) => {
  res.render("../views/auth/login.ejs");
};

const adminRegisterView = (req, res) => {
  res.render("../views/auth/register.ejs");
};
const adminDashboard = async (req, res) => {
  try {
    const pending = await adminService.allPending();
    const inProgress = await adminService.allInProgress();
    const completed = await adminService.allCompleted();
    const rejected = await adminService.allRejected();
    res.render("../views/admin/landing.ejs", {
      user: req.user,
      pending: pending.length,
      inProgress: inProgress.length,
      completed: completed.length,
      rejected: rejected.length,
      title: "Report Numbers",
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllCrimeReports = async (req, res) => {
  try {
    const crimes = await adminService.getAllCrimeDetails();
    res.render("../views/admin/reportList.ejs", {
      user: req.user,
      crimes: crimes,
      title: "Report List",
      moment: moment,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const adminRegister = async (req, res) => {
  const { fullName, email, password, phone, username } = req.body;
  try {
    let admin = await userService.findUserByEmail(email);
    // console.log(admin);
    if (admin) {
      console.error("User already exists");
      return res.status(400).send("User already exists");
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
      return res
        .status(400)
        .json({ msg: "This email is not associated with any account" });
    }
    if (!(await user.validPassword(password))) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    const token = generateToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/api/admin/dashboard");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await adminService.deleteUser(req.params.id);
    if (user) {
      await user.destroy();
      return res.json({ msg: `User removed successfully` });
    }
    return res.status(404).send({ msg: "User not found" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};
const crimeDetailsByUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const crimes = await crimeService.getCrimeDetailsByUser(req.params.id);
    res.json(crimes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// const allCrimeDetails = async (req, res) => {
//   try {
//     const crimes = await adminService.getAllCrimeDetails();
//     res.json(crimes);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send("Server Error");
//   }
// };

const updateCrimeStatus = async (req, res) => {
  console.log(req.body.status);
  try {
    await adminService.updateCrimeStatus(req.body.status, req.params.id);
    // const crime = await crimeService.getCrimeById(req.params.id);
    res.redirect("/api/admin/reportList");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const allPendingReports = async (req, res) => {
  try {
    const crime = await adminService.allPending();
    console.log(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const allInProgressReports = async (req, res) => {
  try {
    const crime = await adminService.allInProgress();
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const allCompletedReports = async (req, res) => {
  try {
    const crime = await adminService.allCompleted();
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const allRejectedReports = async (req, res) => {
  try {
    const crime = await adminService.allRejected();
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  adminLoginView,
  adminRegisterView,
  adminDashboard,
  adminRegister,
  adminLogin,
  crimeDetailsByUser,
  getAllCrimeReports,
  updateCrimeStatus,
  deleteUser,
  getAllUsers,
  allCompletedReports,
  allPendingReports,
  allInProgressReports,
  allRejectedReports,
};
