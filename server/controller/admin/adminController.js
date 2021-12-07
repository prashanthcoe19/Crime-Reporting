const adminService = require("../../services/adminService");

const crimeService = require("../../services/crimeService");

const moment = require("moment");

//view pages for admin login and register

const deleteReport = async (req, res) => {
  try {
    const report = await crimeService.getCrimeById(req.params.id);
    await report.destroy();
    res.redirect("/api/admin/reportList");
  } catch (err) {
    console.log(err);
  }
};

const adminSearchView = (req, res) => {
  res.render("../views/admin/search.ejs", {
    user: req.user,
    title: "Search",
    query: req.query.name,
  });
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

const searchByCrimeType = async (req, res) => {
  try {
    const crime = await adminService.searchCrime(req.body.name);
    res.render("../views/admin/searchResults.ejs", {
      user: req.user,
      crime: crime,
      title: "Search Results",
      moment: moment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const searchCrimeByName = async (req, res) => {
  // console.log("Name is " + req.body.name);
  try {
    const crime = await adminService.searchByName(req.body.name);
    if (!crime) {
      return res.json({ msg: "Not found" });
    }
    // res.json(crime);
    res.render("../views/admin/searchResults", {
      user: req.user,
      crime: crime,
      title: "Search Results",
      moment: moment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const searchCrimeByDate = async (req, res) => {
  try {
    const crime = await adminService.searchByDate(req.body.date);
    // console.log(crime);
    res.render("../views/admin/searchResults", {
      user: req.user,
      crime: crime,
      title: "Search Results",
      moment: moment,
    });
  } catch (err) {
    console.log(err);
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
  adminSearchView,
  adminDashboard,
  searchCrimeByName,
  searchByCrimeType,
  searchCrimeByDate,
  crimeDetailsByUser,
  getAllCrimeReports,
  updateCrimeStatus,
  deleteUser,
  deleteReport,
  getAllUsers,
  allCompletedReports,
  allPendingReports,
  allInProgressReports,
  allRejectedReports,
};
