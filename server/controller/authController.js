const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");

const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await authService.signIn(body.email);
    if (!user) {
      return res
        .status(400)
        .json({ msg: "This email is not associated with any account" });
    }
    if (!(await user.validPassword(body.password))) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    const token = generateToken(user.id);
    res.json({ user, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getLoggedinUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { login, getLoggedinUser };
