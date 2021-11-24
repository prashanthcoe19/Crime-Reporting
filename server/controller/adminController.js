const adminService = require("../services/adminService");
const userService = require("../services/userService");
const crimeService = require("../services/crimeService");

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

const allCrimeDetails = async (req, res) => {
  try {
    const crimes = await adminService.getAllCrimeDetails();
    res.json(crimes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const updateCrimeStatus = async (req, res) => {
  try {
    await adminService.updateCrimeStatus(req.body.status, req.params.id);
    const crime = await crimeService.getCrimeById(req.params.id);
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const allPendingReports = async (req, res) => {
  try {
    const crime = await adminService.allPending();
    res.json(crime);
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
  crimeDetailsByUser,
  allCrimeDetails,
  updateCrimeStatus,
  deleteUser,
  getAllUsers,
  allCompletedReports,
  allPendingReports,
  allInProgressReports,
  allRejectedReports,
};
