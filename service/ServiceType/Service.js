const { ObjectId } = require("mongodb");
const database = require("../../database");

async function createService(service) {
  try {
    const collection = database.client.db("MEAN").collection("service");
    const result = await collection.insertOne({
      nom: service.nom,
      prix: service.prix,
      durre: service.durre,
      commission: service.commission,
      image: service.image,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function GetServiceById(id) {
  try {
    const collection = database.client.db("MEAN").collection("service");
    const objectId = new ObjectId(id);
    const service = await collection.findOne({ _id: objectId });
    return service;
  } catch (error) {
    console.error(error);
  }
}
async function ListService() {
  try {
    const collection = database.client.db("MEAN").collection("service");
    const list = await collection.find({}).toArray();
    return list;
  } catch (error) {
    console.error(error);
  }
}
async function updateService(service, id) {
  try {
    const collection = database.client.db("MEAN").collection("service");
    const filter = { _id: new ObjectId(id) };

    const updateDoc = {
      $set: {
        nom: service.nom,
        prix: service.prix,
        durre: service.durre,
        commission: service.commission,
        image: service.image,
      },
    };

    const result = await collection.updateOne(filter, updateDoc);
    if (result.matchedCount === 0) {
      console.warn("No user found with the provided filter:", filter);
    } else {
      console.log("Service updated successfully:", result.matchedCount);
    }
  } catch (error) {
    console.error(error);
  }
}
async function deleteService(idService) {
  try {
    const collection = database.client.db("MEAN").collection("service");

    const filter = { _id: new ObjectId(idService) };

    await collection.deleteOne(filter);
  } catch (err) {
    console.error("Error during user deletion:", err);
    throw err;
  }
}

module.exports = {
  createService,
  ListService,
  updateService,
  deleteService,
  GetServiceById,
};
