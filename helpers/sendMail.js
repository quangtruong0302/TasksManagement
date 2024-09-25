const nodemailer = require("nodemailer");

module.exports.sendMail = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "buiquangtruong170302@gmail.com",
      pass: "juba sorh wwwi lack",
    },
  });
  const mailOptions = {
    from: "buiquangtruong170302@gmail.com",
    to: email,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send: " + info.response);
    }
  });
};
