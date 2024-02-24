const database = require("../../database.js");
const preference = require("../../model/Preference/preference");

async function AddToPreference(pref) {
  try {
    const collection = database.client.db("MEAN").collection("preference");

    await collection.insertOne({
      employe: pref.employe,
      client: pref.client,
      service: pref.service,
      idEmp: pref.idEmp,
      type: pref.type,
    });
  } catch (error) {
    console.error(error);
  }
}

async function checkIfItPreferencesExist(type, clientId, serviceId) {
  try {
    const collection = database.client.db("MEAN").collection("preference");

    const query = {
      type: type,
      "client.idClient": clientId,
      "service.idServ": serviceId,
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

async function CountPreferences(type, clientId) {
  try {
    const collection = database.client.db("MEAN").collection("preference");

    const count = await collection.countDocuments({
      type: type,
      "client.idClient": clientId,
    });
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function GetPreference(type, clientId) {
  try {
    const collection = database.client.db("MEAN").collection("preference");
    const preferences = await collection
      .find({ type: type, "client.idClient": clientId })
      .toArray();
    return preferences;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function removePreference(type, clientId) {
  try {
    const collection = database.client.db("MEAN").collection("preference");
    const deletePref = await collection.deleteOne({
      type: type,
      "client.idClient": clientId,
    });
    return deletePref;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  AddToPreference,
  checkIfItPreferencesExist,
  CountPreferences,
  GetPreference,
  removePreference,
};
