const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");

const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await authService.signIn(body);
    if (!user) {
      return res
        .status(404)
        .send("This email is not associated with any account");
    }
    if (!(await user.validPassword(body.password))) {
      return res.status(400).send("Invalid Password");
    }
    const token = generateToken(user.id);
    res.cookie("crimeJWT", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
    });
    res.json({
      user,
    });
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
