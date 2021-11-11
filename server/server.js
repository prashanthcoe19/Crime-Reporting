const express = require("express");
const app = express();
const PORT = 5000;
const connectSQL = require("./config/db");
const users = require("./routes/userRoutes");
const auth = require("./routes/authRoutes");
connectSQL();
// method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to crime reporting app" });
});

app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server started at PORT ${PORT}`);
});
