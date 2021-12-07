const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    const user = await userService.createUser(body);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { createUser };
