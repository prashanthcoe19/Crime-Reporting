const User = require("../models").User;

const signIn = async (email) => {
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
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    return err;
  }
};

module.exports = { signIn, getCurrentUser };
