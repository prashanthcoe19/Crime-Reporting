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
    const crimes = await crimeService.getCurrentUserCrimes(req.user.id);
    res.json(crimes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
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
    const crimes = await crimeService.getAllCrimeDetails();
    res.json(crimes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const updateCrimeStatus = async (req, res) => {
  try {
    await crimeService.updateCrimeStatus(req.body.status, req.params.id);
    const crime = await crimeService.getCrimeById(req.params.id);
    res.json(crime);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  createReport,
  loggedinUserCrimes,
  crimeDetailsByUser,
  allCrimeDetails,
  updateCrimeStatus,
};
