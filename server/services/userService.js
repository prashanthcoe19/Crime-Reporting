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

const editUser = async (data, id) => {
  console.log(data);
  try {
    const user = User.update(data, {
      where: {
        id: id,
      },
      individualHooks: true,
    });
    return user;
  } catch (err) {
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

const getUserById = async (id) => {
  try {
    console.log(id);
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    return err;
  }
};

const addToken = async (data, email) => {
  console.log(data);
  try {
    const user = await User.update(data, { where: { email: email } });
    return user;
  } catch (err) {
    return err;
  }
};

const resetPassword = async (data, id) => {
  try {
    const user = await User.update(data, {
      where: {
        id: id,
      },
      individualHooks: true,
    });
    return user;
  } catch (err) {
    return err;
  }
};

const verifyToken = async (token) => {
  try {
    const user = await User.findOne({ where: { resetToken: token } });
    return user;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createUser,
  editUser,
  findUserByEmail,
  getUserById,
  addToken,
  resetPassword,
  verifyToken,
};
