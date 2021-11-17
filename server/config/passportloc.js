const LocalStrategy = require("passport-local").Strategy;
const authService = require("../services/authService");
const passport = require("passport");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await authService.signIn(email);
        // console.log(user);
        if (!user) {
          return done(null, false, { message: "Email not found" });
        }
        console.log(password);
        if (!(await user.validPassword(password))) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
// const authenticateUser = async (email, password, done) => {
//   try {
//     const user = await authService.signIn(email);
//     // console.log(user);
//     if (!user) {
//       return done(null, false, { message: "Email not found" });
//     }
//     console.log(password);
//     if (!(await user.validPassword(password))) {
//       return done(null, false, { message: "Incorrect Password" });
//     }
//     return done(null, user);
//   } catch (err) {
//     done(err);
//   }
// };

// const strategy = new LocalStrategy(
//   { usernameField: "email", passwordField: "password" },
//   authenticateUser
// );

// passport.use(strategy);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    console.log(`id ${5}`);
    const user = await authService.getCurrentUser(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
