const database = require("../../database.js");
const MailSenderEmail = require("../../utils/mailSender");
const moment = require("moment");
const utils = require("../../utils/utils");
const jwt = require("jsonwebtoken");

async function registerUser(user) {
  try {
    const collection = database.client.db("MEAN").collection("users");

    const hashedPassword = await utils.CryptPass(user.password);

    const age = await utils.calculateAge(user.date_naissance);
    const validation_code = await utils.generateRandomNumber();
    await collection.insertOne({
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      date_naissance: user.date_naissance,
      age: age,
      is_activate: false,
      validation_code: validation_code,
      image: user.image,
    });
    console.log(user.image);
    const subject = "Bienvenu sur notre salon de beaute" + " " + user.email;

    MailSenderEmail.sendEmail(user.email, subject, validation_code);
  } catch (err) {
    console.error("Error during user registration:", err);
    throw err;
  }
}
module.exports = {
  registerUser,
};
