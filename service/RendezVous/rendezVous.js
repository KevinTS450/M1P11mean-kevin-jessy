const database = require("../../database");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

async function createRendezVous(rendezVous) {
  try {
    const collection = database.client.db("MEAN").collection("rendezVous");

    console.log(rendezVous);
    await collection.insertOne({
      employe: rendezVous.employe,
      client: rendezVous.client,
      serviceAsked: rendezVous.serviceAsked,
      start: rendezVous.start,
      end: rendezVous.end,
      isDone: rendezVous.isDone,
      isConfirmed: rendezVous.isConfirmed,
    });

    console.log("rendezVous registered successfully");
  } catch (err) {
    console.error("Error during rendezVous registration:", err);
    throw err;
  }
}

async function getRendezVousById(id) {
  try {
    const collection = database.client.db("MEAN").collection("rendezVous");

    const rendezVous = await collection.findOne({ _id: new ObjectId(id) });

    return rendezVous;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}
async function checkRendezVousInInterval(startStr, endStr, employeId) {
  try {
    const pointageCollection = database.client
      .db("MEAN")
      .collection("pointage");

    const startTimeParts = startStr.split(":").map(Number);
    const endTimeParts = endStr.split(":").map(Number);

    // Extract hours and minutes
    const startHour = startTimeParts[0];
    const startMinute = startTimeParts[1];
    const endHour = endTimeParts[0];
    const endMinute = endTimeParts[1];

    const isEmployeeFree = await pointageCollection.findOne({
      idEmp: employeId,
      start_time: { $lte: startStr },
      end_time: { $gte: endStr },
    });

    return isEmployeeFree ? isEmployeeFree : null;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}
async function GetAllRendezVous() {
  try {
    const collection = database.client.db("MEAN").collection("rendezVous");

    const rendezVous = await collection.find({}).toArray();

    return rendezVous;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function updateRendezVous(rendezVous) {
  try {
    const collection = database.client.db("MEAN").collection("rendezVous");

    const filter = { id: rendezVous.id };

    const updateRendezVous = {
      $set: {
        employee: rendezVous.employe,
        client: rendezVous.client,
        serviceAsked: rendezVous.serviceAsked,
        start: rendezVous.start,
        end: rendezVous.end,
        isDone: rendezVous.isDone,
        isConfirmed: rendezVous.isDone,
      },
    };

    const result = await collection.updateOne(filter, updateRendezVous);

    if (result.matchedCount === 0) {
      console.warn("No rendezVous found with the provided filter:", filter);
    } else {
      console.log("rendezVous updated successfully:", result.matchedCount);
    }
  } catch (err) {
    console.error("Error during rendezVous update:", err);
    throw err;
  }
}

async function deleteRendezVousById(idRendezVous) {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("rendezVous");

    // Delete the rendezVous document
    const result = await collection.deleteOne({
      _id: new ObjectId(idRendezVous),
    });

    if (result.deletedCount === 0) {
      console.warn("No rendezVous found with the provided id:", idRendezVous);
    } else {
      console.log("rendezVous deleted successfully:", result.deletedCount);
    }
  } catch (err) {
    console.error("Error during rendezVous deletion:", err);
    throw err;
  }
}

module.exports = {
  createRendezVous,
  getRendezVousById,
  GetAllRendezVous,
  updateRendezVous,
  deleteRendezVousById,
  checkRendezVousInInterval,
};
