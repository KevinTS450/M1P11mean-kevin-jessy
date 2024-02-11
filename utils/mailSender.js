const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tsilavinarazafy450@gmail.com",
      pass: "slrfdalquzfcftes",
    },
  });

  let mailOptions = {
    from: "tsilavinarazafy450@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Email sent: " + info.response);
}

module.exports = {
  sendEmail,
};
