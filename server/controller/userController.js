const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { body } = req;
  try {
    const user = await userService.createUser(body);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (user) {
      await user.destroy();
      return res.json({ msg: `User removed successfully` });
    }
    return res.status(404).send({ msg: "User not found" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};

module.exports = { createUser, getAllUsers, deleteUser };
