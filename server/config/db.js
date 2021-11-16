const db = require("../models");

const connectSQL = async () => {
  try {
    await db.sequelize.sync();
    console.log(`Database connected..`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectSQL;
