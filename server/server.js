const express = require("express");
const app = express();
const PORT = 5000;
const connectSQL = require("./config/db");
const users = require("./routes/userRoutes");
const auth = require("./routes/authRoutes");
const crime = require("./routes/crimeRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const { notFound, errorHandling } = require("./middleware/error");
connectSQL();
// method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(
  session({
    secret: "this is secret key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to crime reporting app" });
});

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/crime", crime);

// app.use(notFound);
// app.use(errorHandling);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server started at PORT ${PORT}`);
});
