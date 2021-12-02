const User = require("../models").User;

const createUser = async (data) => {
  console.log(data);
  try {
    const user = await User.create(data);
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findUserByEmail = async (email) => {
  // const { email } = data;
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (err) {
    return err;
  }
};

const getUserById = async ({ id }) => {
  try {
    console.log(`Id is ${id}`);
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    return err;
  }
};
module.exports = { createUser, findUserByEmail, getUserById };
