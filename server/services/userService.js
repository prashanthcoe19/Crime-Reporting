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

const getAllUsers = async () => {
  try {
    const user = await User.findAll();
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

module.exports = { createUser, getAllUsers, deleteUser };
