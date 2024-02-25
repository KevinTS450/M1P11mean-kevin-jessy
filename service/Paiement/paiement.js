const database = require("../../database");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

async function createPaiement(paiement) {
  try {
    const collection = database.client.db("MEAN").collection("paiement");

    await collection.insertOne({
      montant: paiement.montant,
      motif: paiement.motif,
      temp: paiement.temp,
      idRendezVous: paiement.idRendezVous,
      idEmploye: paiement.idEmploye
    });

    console.log("rendezVous registered successfully");
  } catch (err) {
    console.error("Error during rendezVous registration:", err);
    throw err;
  }
}

async function getPaiementById(id) {
  try {
    const collection = database.client.db("MEAN").collection("paiement");

    const paiement = await collection.findOne({ _id: new ObjectId(id) });

    return paiement;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function GetAllPaiements() {
  try {
    const collection = database.client.db("MEAN").collection("paiement");

    const paiements = await collection.find({}).toArray();

    return paiements;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function updatePaiement(id, paiement) {
  try {
    const collection = database.client.db("MEAN").collection("paiement");

    const filter = { _id: new ObjectId(id) };

    const updateRendezVous = {
      $set: {
        montant: paiement.montant,
        motif: paiement.motif,
        temp: paiement.temp,
        idRendezVous: paiement.idRendezVous,
        idEmploye: paiement.idEmploye
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

async function deletePaiementById(idPaiement) {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("paiement");

    // Delete the rendezVous document
    const result = await collection.deleteOne({
      _id: new ObjectId(idPaiement),
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
    createPaiement,
    getPaiementById,
    GetAllPaiements,
    updatePaiement,
    deletePaiementById
};
