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

module.exports = { createUser };
