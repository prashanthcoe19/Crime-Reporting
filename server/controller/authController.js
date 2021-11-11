const generateToken = require("../utils/generateToken");
const User = require("../models").User;

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ raw: true, where: email });
    if (!user) {
      return res.status(400).send("Email not found");
    }
    if (!(await user.validPassword(password))) {
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
