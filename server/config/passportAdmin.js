const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userService = require("../services/userService");
const config = require("config");

const cookieExtracter = async (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  console.log(token);
  return token;
};

const opts = {
  jwtFromRequest: cookieExtracter,
  secretOrKey: config.get("jwtSecret"),
};

let strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    console.log("Payload is: " + jwt_payload.id);
    const id = jwt_payload.id;
    const user = await userService.getUserById(id);
    if (!user) {
      console.log("User not found");
      return done(null, false, { message: "User not found" });
    }
    done(null, user);
  } catch (err) {
    console.log(err);
    return done(err, false);
  }
});
passport.use(strategy);

module.exports = {
  initialize: function () {
    return passport.initialize();
  },
  authenticate: (req, res, next) => {
    return passport.authenticate(
      "jwt",
      { session: false },
      (err, user, info) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("User is:" + user);
        if (!user) {
          return res.send("Unauthorized User");
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  },
};
// passport.use(
//   new JwtStrategy(opts, async function (req, jwt_payload, done) {
//     try {
//       console.log("Payload is: " + jwt_payload.id);
//       const user = await userService.getUserById({
//         id: jwt_payload.id,
//       });
//       if (!user) {
//         return done(null, false, { message: "User not found" });
//       }
//       req.user = user;
//       return done(null, user);
//     } catch (err) {
//       console.log(err);
//     }
//   })
// );
// module.exports = passport;
