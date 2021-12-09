const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",
  auth: {
    user: process.env.email,
    pass: provess.env.pwd,
  },
});

const mailer = async (opts) => {
  try {
    await transporter.sendMail(opts);
  } catch (err) {
    console.log(err);
  }
};

module.exports = mailer;
