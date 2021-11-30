const express = require("express");
const app = express();
const connectSQL = require("./config/db");
const users = require("./routes/userRoutes");
const auth = require("./routes/authRoutes");
const crime = require("./routes/crimeRoutes");
const admin = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");

const { notFound, errorHandling } = require("./middleware/error");

connectSQL();

dotenv.config();
// method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to crime reporting app" });
});

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/crime", crime);
app.use("/api/admin", admin);

// app.use(notFound);
// app.use(errorHandling);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server started at PORT ${process.env.PORT}`);
});
