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
      username: user.username,
      email: user.email,
      role: user.role,
      password: hashedPassword,
      date_naissance: user.date_naissance,
      age: age,
      is_activate: false,
      validation_code: validation_code,
    });
    console.log(validation_code);
    const subject = "Bienvenu sur notre salon de beaute" + " " + user.email;

    MailSenderEmail.sendEmail(user.email, subject, validation_code);

    console.log("User registered successfully");
  } catch (err) {
    console.error("Error during user registration:", err);
    throw err;
  }
}
module.exports = {
  registerUser,
};
