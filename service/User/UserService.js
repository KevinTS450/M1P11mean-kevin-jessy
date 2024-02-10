const database = require("../../database.js");
const utils = require("../../utils/utils");

async function getUserById(id, db) {
  try {
    const collection = db.collection("users"); // Assuming 'users' is your collection name

    // Find the user by ID
    const user = await collection.findOne({ _id: ObjectId(id) });

    return user;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function GetAllUsers() {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("users");

    // Find all documents in the collection
    const users = await collection.find({}).toArray();

    return users;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function updateUser(user) {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("users");

    const filter = { id: user.id }; // Use other relevant fields from user if needed

    // Update object with changes (modify fields and values as needed)
    const updateDoc = {
      $set: {
        username: user.username,
        email: user.email,
        role: user.role,
        password: user.password,
        date_naissance: user.date_naissance,
        age: utils.calculateAge(user.date_naissance),
        is_activate: user.is_activate
      }
    };

    // Update the document
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
    // Specify the collection
    const collection = database.client.db("MEAN").collection("users");

    // Define the filter criteria
    const filter = { id: idUser };

    // Delete the user document
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
  deleteUser
};
