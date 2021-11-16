const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    console.log(`request: ${req}`);
    res.json(req.user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getLoggedinUser = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { login, getLoggedinUser };
