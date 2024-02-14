const database = require("../../database");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
async function CreatePointageForEmp(emp) {
  try {
    const collection = database.client.db("MEAN").collection("pointage");

    await collection.insertOne({
      empoye: emp.employe,
      idEmp: emp.idEmp,
      start_time: emp.start_time,
      end_time: emp.end_time,
    });
  } catch (error) {
    console.error(error);
  }
}

async function GetEmpPointage(id) {
  try {
    const collection = database.client.db("MEAN").collection("pointage");

    console.log("Searching for pointage with ID:", id);

    const pointage = await collection.findOne({ idEmp: id });

    console.log("Retrieved pointage:", pointage);

    return pointage;
  } catch (error) {
    console.error("Error while retrieving pointage:", error);
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
}

async function updatePointageEmp(emp) {
  try {
    const collection = database.client.db("MEAN").collection("pointage");

    const filter = { id: emp.id };

    const updateDoc = {
      $set: {
        start_time: emp.start_time,
        end_time: emp.end_time,
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
module.exports = {
  CreatePointageForEmp,
  GetEmpPointage,
  updatePointageEmp,
};