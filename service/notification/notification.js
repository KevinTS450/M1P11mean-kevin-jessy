const database = require("../../database");
const mongoose = require("mongoose");
const userService = require("../User/UserService");
const { ObjectId } = require("mongodb");
async function CreateNotification(notif) {
  try {
    const collection = database.client.db("MEAN").collection("notification");

    if (notif.notification === "service") {
      const users = await userService.getUsersByRole("client");

      const destinataires = users.map((user) => user._id);

      const results = await Promise.all(
        destinataires.map(async (destinataireId) => {
          const result = await collection.insertOne({
            notification: notif.notification,
            remarque: notif.remarque,
            date: notif.date,
            isRead: false,
            serviceConcerne: notif.serviceConcerne,
            destinataire: destinataireId,
            envoyeur: notif.envoyeur,
          });
          return result;
        })
      );

      return results;
    } else {
      const result = await collection.insertOne({
        notification: notif.notification,
        remarque: notif.remarque,
        date: notif.date,
        isRead: false,
        serviceConcerne: notif.serviceConcerne,
        destinataire: notif.destinataire,
        envoyeur: notif.envoyeur,
      });
      return result;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function FindNotifByIdUser(id) {
  try {
    const collection = database.client.db("MEAN").collection("notification");
    const getNotif = await collection.find({ destinataire: id }).toArray();
    return getNotif;
  } catch (error) {
    console.error(err);
  }
}

async function getCountNotifNotRead(id) {
  try {
    const collection = database.client.db("MEAN").collection("notification");
    const countNotifNoRead = await collection.countDocuments({
      destinataire: id,
      isRead: false,
    });
    return countNotifNoRead;
  } catch (error) {
    console.error(error);
  }
}

async function UpdateLecture(id) {
  try {
    const collection = database.client.db("MEAN").collection("notification");
    const update = await collection.updateOne(
      {
        destinataire: id,
        isRead: false,
      },
      { $set: { isRead: true } }
    );
    return update;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
module.exports = {
  CreateNotification,
  FindNotifByIdUser,
  getCountNotifNotRead,
  UpdateLecture,
};
