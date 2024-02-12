const nodemailer = require("nodemailer");
const htmlContent = require("./HtmlMailContent");

async function sendEmail(to, subject, code) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tsilavinarazafy450@gmail.com",
      pass: "slrfdalquzfcftes",
    },
  });

  let html = await htmlContent.render(to, code);

  let mailOptions = {
    from: "tsilavinarazafy450@gmail.com",
    to: to,
    subject: subject,
    html: html,
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Email sent: " + info.response);
}

module.exports = {
  sendEmail,
};
