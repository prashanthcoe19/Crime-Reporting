const Crime = require("../models").Crime;
const User = require("../models").User;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const createCrimeReport = async (data) => {
  try {
    const crime = await Crime.create(data);
    return crime;
  } catch (err) {
    return err;
  }
};

const editReport = async (data, id) => {
  // console.log(`Data ${data} id: ${id}`);
  try {
    const report = await Crime.update(data, {
      where: { id: id },
    });
    console.log(report);
    return report;
  } catch (err) {
    return err;
  }
};
// const getCurrentUserCrimes = async (id) => {
//   try {
//     const crimes = await Crime.findAll({where:{userID:id}});
//     console.log(crimes);
//     return crimes;
//   } catch (err) {
//     return err;
//   }
// };

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

const searchCrime = async (term) => {
  try {
    const crimes = Crime.findAll({
      where: { crimeType: { [Op.like]: `%${term}%` } },
    });
    return crimes;
  } catch (err) {
    return err;
  }
};

const searchByName = async (term) => {
  console.log(term);
  try {
    const crimes = Crime.findAll({
      include: [
        {
          model: User,
          as: "users",
          where: {
            fullName: { [Op.like]: `%${term}%` },
          },
        },
      ],
    });
    // const crimes = Crime.findAll({ include: [{ model: User, as: "users" }] });
    return crimes;
  } catch (err) {
    return err;
  }
};

const getPending = async (id) => {
  console.log(id);
  try {
    const crimes = Crime.findAll({ where: { status: "Pending", userID: id } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const getInProgress = async (id) => {
  console.log(id);
  try {
    const crimes = Crime.findAll({
      where: { status: "In Progress", userID: id },
    });
    return crimes;
  } catch (err) {
    return err;
  }
};

const getRejected = async (id) => {
  console.log(id);
  try {
    const crimes = Crime.findAll({ where: { status: "Rejected", userID: id } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const getCompleted = async (id) => {
  console.log(id);
  try {
    const crimes = Crime.findAll({
      where: { status: "Completed", userID: id },
    });
    return crimes;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createCrimeReport,
  // getCurrentUserCrimes,
  getCrimeDetailsByUser,
  getCrimeById,
  searchCrime,
  searchByName,
  getPending,
  getCompleted,
  getInProgress,
  getRejected,
  editReport,
};
