const crimeService = require("../services/crimeService");

const createReport = async (req, res) => {
  const { crimeType, description } = req.body;
  try {
    const crime = await crimeService.createCrimeReport({
      crimeType,
      description,
      userID: req.user.id,
    });
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const loggedinUserCrimes = async (req, res) => {
  try {
    console.log("Id is" + req.user.id);
    const crimes = await crimeService.getCrimeDetailsByUser(req.user.id);
    res.json(crimes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// report according to status of currently logged in user
const getPendingReports = async (req, res) => {
  try {
    const crime = await crimeService.getPending(req.user.id);
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
const getInProgressReports = async (req, res) => {
  try {
    const crime = await crimeService.getInProgress(req.user.id);
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getCompletedReports = async (req, res) => {
  try {
    const crime = await crimeService.getCompleted(req.user.id);
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getRejectedReports = async (req, res) => {
  try {
    const crime = await crimeService.getRejected(req.user.id);
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createReport,
  loggedinUserCrimes,
  getPendingReports,
  getInProgressReports,
  getCompletedReports,
  getRejectedReports,
};
