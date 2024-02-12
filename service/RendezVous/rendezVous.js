const database = require("../../database");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

async function createRendezVous(rendezVous) {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("rendezVous");

    // Insert the rendezVous into the collection
    console.log(rendezVous)
    await collection.insertOne({
      employee: rendezVous.employe,
      client: rendezVous.client,
      serviceAsked: rendezVous.serviceAsked,
      start: rendezVous.start,
      end: rendezVous.end,
      isDone: rendezVous.isDone,
      isConfirmed: rendezVous.isConfirmed
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

async function GetAllRendezVous() {
  try {

    const collection = database.client.db("MEAN").collection("rendezVous");

    // Find all documents in the collection
    const rendezVous = await collection.find({}).toArray();

    return rendezVous;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function updateRendezVous(rendezVous) {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("rendezVous");

    const filter = { id: rendezVous.id }; // Use other relevant fields from rendezVous if needed

    // Update object with changes (modify fields and values as needed)
    const updateRendezVous = {
        $set: {
            employee: rendezVous.employe,
            client: rendezVous.client,
            serviceAsked: rendezVous.serviceAsked,
            start: rendezVous.start,
            end: rendezVous.end,
            isDone: rendezVous.isDone,
            isConfirmed: rendezVous.isDone
        }
    };

    // Update the document
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
    const result = await collection.deleteOne({ _id: new ObjectId(idRendezVous) });

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
    deleteRendezVousById
};
