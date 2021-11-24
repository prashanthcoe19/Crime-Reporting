const Crime = require("../models").Crime;
const User = require("../models").User;

const getAllUsers = async () => {
  try {
    const user = await User.findAll({ attributes: { exclude: ["password"] } });
    return user;
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
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

const allPending = async (id) => {
  console.log(id);
  try {
    const crimes = Crime.findAll({ where: { status: "Pending" } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const allInProgress = async (id) => {
  console.log(id);
  try {
    const crimes = Crime.findAll({ where: { status: "In Progress" } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const allRejected = async (id) => {
  console.log(id);
  try {
    const crimes = Crime.findAll({ where: { status: "Rejected" } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const allCompleted = async (id) => {
  console.log(id);
  try {
    const crimes = Crime.findAll({ where: { status: "Completed" } });
    return crimes;
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

module.exports = {
  allPending,
  allCompleted,
  allInProgress,
  allRejected,
  getAllCrimeDetails,
  updateCrimeStatus,
  getAllUsers,
  deleteUser,
};
