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
      versed: false,
      rendezVous: paiement.rendezVous,
      employe: paiement.employe,
      client: paiement.client,
      service: paiement.service,
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

async function getPaiementByIdEmp(idEmp) {
  try {
    const collection = database.client.db("MEAN").collection("paiement");

    const paiement = await collection.findOne({ "empoye.idEmp": idEmp });

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
        idEmploye: paiement.idEmploye,
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
    const collection = database.client.db("MEAN").collection("paiement");

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

async function versementEmploye(idEmp, monaie) {
  try {
    const collection = database.client.db("MEAN").collection("mobileMoney");

    const filter = { "user.idUser": idEmp };
    const userDoc = await collection.findOne(filter);

    let newMontant = parseFloat(monaie);

    if (userDoc && userDoc.monnaie) {
      newMontant += parseFloat(userDoc.monnaie);
    }

    const update = {
      $set: {
        monnaie: newMontant,
      },
    };
    const result = await collection.updateOne(filter, update);

    const paiementCollection = database.client
      .db("MEAN")
      .collection("paiement");
    const paiementFilter = { "employe.idEmp": idEmp };
    const paiementUpdate = {
      $set: {
        versed: true,
      },
    };
    await paiementCollection.updateOne(paiementFilter, paiementUpdate);

    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createPaiement,
  getPaiementById,
  GetAllPaiements,
  updatePaiement,
  deletePaiementById,
  versementEmploye,
};
