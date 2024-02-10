const database = require("../../database.js");
const moment = require("moment");
const utils = require("../../utils/utils");
const jwt = require("jsonwebtoken");

async function registerUser(user) {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("users");

    // Hash the user's password
    const hashedPassword = await utils.CryptPass(user.password);

    // Calculate age
    const age = await utils.calculateAge(user.date_naissance);

    // Insert the user into the collection
    await collection.insertOne({
      nom: user.username,
      email: user.email,
      role: user.role,
      password: hashedPassword,
      date_naissance: user.date_naissance,
      age: age,
      is_activate: false, // Set to false as per your original query
    });

    console.log("User registered successfully");
  } catch (err) {
    console.error("Error during user registration:", err);
    throw err;
  }
}
module.exports = {
  registerUser,
};
