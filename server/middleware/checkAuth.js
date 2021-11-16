const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("User is authenticated");
    return next();
  }
  return res.json("Not Authenticated");
};

module.exports = checkAuth;
