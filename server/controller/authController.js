const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");

const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await authService.signIn(body);
    if (!user) {
      return res.status(400).send("Email not found");
    }
    if (!(await user.validPassword(body.password))) {
      return res.status(400).send("Invalid Password");
    }
    res.json({
      user,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = { login };
