const User = require("../models").User;
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = async (req, res, next) => {
  //get token from header

  const token = req.cookies.jwt;
  // const token = req.header("x-auth-token");
  //check if not token

  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // console.log(decoded);
    req.user = await User.findByPk(decoded.id);
    // req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token not valid" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    res.status(401).json({ msg: "Not authorized as an admin" });
    throw new Error("Not authorized as an admin");
  }
};
module.exports = { auth, admin };
