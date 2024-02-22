const database = require("../../database.js");
const preference = require("../../model/Preference/preference");

async function AddToPreference(pref) {
  try {
    const collection = database.client.db("MEAN").collection("preference");

    await collection.insertOne({
      employe: pref.employe,
      client: pref.client,
      service: pref.service,
      type: pref.type,
    });
  } catch (error) {
    console.error(error);
  }
}

async function checkIfItPreferencesExist(type, clientId) {
  try {
    const collection = database.client.db("MEAN").collection("preference");

    const query = {
      type: type,
      "client.idClient": clientId,
    };

    const oneResult = await collection.findOne(query);
    if (oneResult) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function CountPreferences(clientId) {
  try {
    const collection = database.client.db("MEAN").collection("preference");

    const query = {
      "client.idClient": clientId,
    };

    const count = await collection.countDocuments({
      query,
    });
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
module.exports = {
  AddToPreference,
  checkIfItPreferencesExist,
  CountPreferences,
};
