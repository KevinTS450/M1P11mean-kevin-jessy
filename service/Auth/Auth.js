const database = require("../../database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("../../utils/utils.js");

async function getUserByEmail(email) {
  try {
    const collection = database.client.db("MEAN").collection("users");
    const user = await collection.findOne({ email: email });

    return user;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function logout(token) {
  utils.addToBlacklist(token);
  return { message: "Logged out successfully" };
}

const handleAuthentication = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user || !(await bcrypt.compareSync(password, user.password))) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
};
async function ActivateAccount(email) {
  try {
    const collection = database.client.db("MEAN").collection("users");
    const result = await collection.updateOne(
      { email: email },
      { $set: { is_activate: true } }
    );

    return result.modifiedCount; // Return the number of documents updated
  } catch (error) {
    console.error(error);
  }
}

async function GenNewCode(email) {
  try {
    const collection = database.client.db("MEAN").collection("users");
    const newCode = utils.generateRandomNumber();
    const result = await collection.updateOne(
      { email: email },
      { $set: { validation_code: newCode } }
    );

    return result.modifiedCount;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getUserByEmail,
  handleAuthentication,
  ActivateAccount,
  GenNewCode,
  logout,
};
