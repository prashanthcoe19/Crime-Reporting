const User = require("../models").User;

const signIn = async (data) => {
  const { email } = data;
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (err) {
    return err;
  }
};
module.exports = { signIn };
