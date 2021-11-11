const User = require("../models").User;
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.auth = async (req, res, next) => {
  //get token from header

  const token = req.header("x-auth-token");
  //check if not token

  if (!token) {
    return res.status(401).json({ msg: "no token auth denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // console.log(decoded);
    req.user = await User.findById(decoded.id).select("-password");
    // req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token not valid" });
  }
};
