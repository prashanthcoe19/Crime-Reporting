const User = require("../models").User;

const findUserByEmail = async (email) => {
  // const { email } = data;
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (err) {
    return err;
  }
};

const getCurrentUser = async (id) => {
  try {
    console.log(`Id is ${id}`);
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    return err;
  }
};

module.exports = { findUserByEmail, getCurrentUser };
