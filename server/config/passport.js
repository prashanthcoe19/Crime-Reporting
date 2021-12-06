const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userService = require("../services/userService");
const config = require("config");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("jwtSecret");
opts.passReqToCallback = true;

passport.use(
  new JwtStrategy(opts, async function (req, jwt_payload, done) {
    try {
      console.log("Payload is: " + jwt_payload.id);
      const id = jwt_payload.id;
      const user = await userService.getUserById(id);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      req.user = user;
      return done(null, user);
    } catch (err) {
      console.log(err);
    }
  })
);
module.exports = passport;
