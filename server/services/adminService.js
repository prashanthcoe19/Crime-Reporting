const Crime = require("../models").Crime;
const User = require("../models").User;
const sequelize = require("sequelize");
const db = require("../models");
const { QueryTypes } = require("sequelize");
const Op = sequelize.Op;
const getAllUsers = async () => {
  try {
    const user = await User.findAll({
      attributes: { exclude: ["password"] },
      where: {
        isAdmin: false,
      },
    });
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

const crimeById = async (id) => {
  try {
    const crime = await Crime.findByPk(id);
    return crime;
  } catch (err) {
    return err;
  }
};

const allPending = async () => {
  try {
    const crimes = await Crime.findAll({ where: { status: "Pending" } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const allInProgress = async () => {
  try {
    const crimes = await Crime.findAll({ where: { status: "In Progress" } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const allRejected = async () => {
  try {
    const crimes = await Crime.findAll({ where: { status: "Rejected" } });
    return crimes;
  } catch (err) {
    return err;
  }
};

const allCompleted = async () => {
  try {
    const crimes = await Crime.findAll({ where: { status: "Completed" } });
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

const searchCrime = async (term) => {
  try {
    const crimes = await Crime.findAll({
      where: { crimeType: { [Op.like]: `%${term}%` } },
      include: [{ model: User, as: "users" }],
    });
    return crimes;
  } catch (err) {
    return err;
  }
};

const searchByName = async (term) => {
  console.log(term);
  try {
    const crimes = await Crime.findAll({
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
    return crimes;
  } catch (err) {
    return err;
  }
};

const searchByDate = async (date) => {
  // console.log(date);
  try {
    const crimes = await db.sequelize.query(
      `SELECT crimes.*, users.fullName
    FROM crimes as crimes 
    left outer join users ON users.id = crimes.userID where crimes.createdAt like "%${date}%"`,
      {
        replacements: ["active"],
        type: QueryTypes.SELECT,
      }
    );
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
  crimeById,
  getAllCrimeDetails,
  updateCrimeStatus,
  getAllUsers,
  deleteUser,
  searchByName,
  searchCrime,
  searchByDate,
};
