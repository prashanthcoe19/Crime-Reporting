const Crime = require("../models").Crime;

const createCrimeReport = async (data) => {
  try {
    const crime = await Crime.create(data);
    return crime;
  } catch (err) {
    return err;
  }
};
const getCurrentUserCrimes = async (id) => {
  try {
    const crimes = await Crime.findByPK(id);
    return crimes;
  } catch (err) {
    return err;
  }
};

const getCrimeDetailsByUser = async (id) => {
  try {
    const crimes = await Crime.findAll({ where: { userID: id } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const getCrimeById = async (id) => {
  try {
    const crime = await Crime.findByPk(id);
    return crime;
  } catch (err) {
    return err;
  }
};

const getAllCrimeDetails = async () => {
  try {
    const crimes = await Crime.findAll();
    return crimes;
  } catch (err) {
    return err;
  }
};

const updateCrimeStatus = async (data, id) => {
  try {
    await Crime.update({ status: data }, { where: { id: id } });
  } catch (err) {
    return err;
  }
};
module.exports = {
  createCrimeReport,
  getCurrentUserCrimes,
  getCrimeDetailsByUser,
  getAllCrimeDetails,
  updateCrimeStatus,
  getCrimeById,
};
