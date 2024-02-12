const database = require("../../database.js");
const utils = require("../../utils/utils");
const mongoose = require("mongoose");
async function getUserById(id) {
  try {
    const collection = database.client.db("MEAN").collection("users");

    // Find the user by ID
    const user = await collection.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    console.log("User in service :", user);

    return user;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function CheckUserExist(email) {
  try {
    const collection = database.client.db("MEAN").collection("users");

    const user = await collection.findOne({ email: email });
    return user;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function GetAllUsers() {
  try {
    const collection = database.client.db("MEAN").collection("users");

    const users = await collection.find({}).toArray();

    return users;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function updateUser(user) {
  try {
    const collection = database.client.db("MEAN").collection("users");

    const filter = { id: user.id };

    const updateDoc = {
      $set: {
        username: user.username,
        email: user.email,
        role: user.role,
        password: user.password,
        date_naissance: user.date_naissance,
        age: utils.calculateAge(user.date_naissance),
        is_activate: user.is_activate,
      },
    };

    const result = await collection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      console.warn("No user found with the provided filter:", filter);
    } else {
      console.log("User updated successfully:", result.matchedCount);
    }
  } catch (err) {
    console.error("Error during user update:", err);
    throw err;
  }
}

async function deleteUser(idUser) {
  try {
    const collection = database.client.db("MEAN").collection("users");

    const filter = { id: idUser };

    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 0) {
      console.warn("No user found with the provided id:", idUser);
    } else {
      console.log("User deleted successfully:", result.deletedCount);
    }
  } catch (err) {
    console.error("Error during user deletion:", err);
    throw err;
  }
}

module.exports = {
  getUserById,
  GetAllUsers,
  updateUser,
  deleteUser,
  CheckUserExist,
};
