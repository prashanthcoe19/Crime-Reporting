const User = require("../models").User;

module.exports.createUser = async (req, res) => {
  const { fullName, email, password, username, phone, role } = req.body;
  try {
    const user = await User.create({
      fullName,
      email,
      password,
      username,
      phone,
      role,
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// module.exports = createUser;
