const database = require("../../database.js");
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken");

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
module.exports = { getUserByEmail, handleAuthentication };
