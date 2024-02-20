const database = require("../../database.js");
const utils = require("../../utils/utils");
const { ObjectId } = require("mongodb");

async function getUserById(id) {
  try {
    const collection = database.client.db("MEAN").collection("users");
    console.log("Id user :", id);

    const objectId = new ObjectId(id);

    const user = await collection.findOne({
      _id: objectId,
    });

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
async function CheckManagerExist(role) {
  try {
    const collection = database.client.db("MEAN").collection("users");

    const user = await collection.findOne({ role: role });
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
        name: user.name,
        last_name: user.last_name,
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

async function getUsersByRole(role) {
  try {
    const collection = database.client.db("MEAN").collection("users");
    console.log("Role user :", role);

    const users = await collection.find({
      role: role,
    }).toArray();

    return users;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

module.exports = {
  getUserById,
  GetAllUsers,
  updateUser,
  deleteUser,
  CheckUserExist,
  CheckManagerExist,
  getUsersByRole
};
