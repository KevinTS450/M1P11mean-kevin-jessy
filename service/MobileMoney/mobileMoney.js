const database = require("../../database");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

async function createMobileMoney(mobileMoney) {
  try {
    const collection = database.client.db("MEAN").collection("mobileMoney");

    await collection.insertOne({
      user: mobileMoney.user,
      operateurNom: mobileMoney.operateurNom,
      monnaie: mobileMoney.monnaie,
      status: mobileMoney.status
    });

    console.log("mobileMoney registered successfully");
  } catch (err) {
    console.error("Error during mobileMoney registration:", err);
    throw err;
  }
}

async function getMobileMoneyByUser(idUser, nomUser, emailUser) {
  try {
    const collection = database.client.db("MEAN").collection("mobileMoney");

    const mobileMoney = await collection.findOne({
      user: { idUser: idUser, nomUser: nomUser, emailUser: emailUser }
    });

    return mobileMoney;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function getMobileMoneyById(id) {
  try {
    const collection = database.client.db("MEAN").collection("mobileMoney");

    const mobileMoney = await collection.findOne({ _id: new ObjectId(id) });

    return mobileMoney;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function GetAllMobileMoney() {
  try {
    const collection = database.client.db("MEAN").collection("mobileMoney");

    const mobileMoneys = await collection.find({}).toArray();

    return mobileMoneys;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function updateMobileMoney(mobileMoney) {
  try {
    const collection = database.client.db("MEAN").collection("mobileMoney");

    const filter = { _id: new ObjectId(mobileMoney._id) };

    const updateMobileMoney = {
      $set: {
        user: mobileMoney.user,
        operateurNom: mobileMoney.operateurNom,
        monnaie: mobileMoney.monnaie
      },
    };

    const result = await collection.updateOne(filter, updateMobileMoney);

    if (result.matchedCount === 0) {
      console.warn("No mobileMoney found with the provided filter:", filter);
    } else {
      console.log("mobileMoney updated successfully:", result.matchedCount);
    }
  } catch (err) {
    console.error("Error during mobileMoney update:", err);
    throw err;
  }
}

async function RechargeMobileMoney(mobileMoney) {
  try {
    const collection = database.client.db("MEAN").collection("mobileMoney");

    const filter = { id: mobileMoney.id };

    const updateMobileMoney = {
      $set: {
        monnaie: mobileMoney.monnaie,
      },
    };

    const result = await collection.updateOne(filter, updateMobileMoney);

    if (result.matchedCount === 0) {
      console.warn("No mobileMoney found with the provided filter:", filter);
    } else {
      console.log("mobileMoney updated successfully:", result.matchedCount);
    }
  } catch (err) {
    console.error("Error during mobileMoney update:", err);
    throw err;
  }
}

async function deleteMobileMoneyById(idMobileMoney) {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("mobileMoney");

    // Define the filter criteria
    // const filter = { id: idMobileMoney };

    // Delete the mobileMoney document
    const result = await collection.deleteOne({
      _id: new ObjectId(idMobileMoney),
    });

    if (result.deletedCount === 0) {
      console.warn("No mobileMoney found with the provided id:", idMobileMoney);
    } else {
      console.log("mobileMoney deleted successfully:", result.deletedCount);
    }
  } catch (err) {
    console.error("Error during mobileMoney deletion:", err);
    throw err;
  }
}

module.exports = {
  createMobileMoney,
  getMobileMoneyById,
  getMobileMoneyByUser,
  GetAllMobileMoney,
  updateMobileMoney,
  deleteMobileMoneyById,
  RechargeMobileMoney,
};
