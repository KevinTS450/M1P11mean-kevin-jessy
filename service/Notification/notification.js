const database = require("../../database");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

async function createNotification(notification) {
  try {
    const collection = database.client.db("MEAN").collection("notification");

    await collection.insertOne({
      notification: notification.notification,
      remarque: notification.remarque,
      temps: notification.temps,
      isRead: notification.isRead,
      idService: notification.idService,
      idDestinataire: notification.idDestinataire
    });

    console.log("rendezVous registered successfully");
  } catch (err) {
    console.error("Error during rendezVous registration:", err);
    throw err;
  }
}

async function getNotificationById(id) {
  try {
    const collection = database.client.db("MEAN").collection("notification");

    const notification = await collection.findOne({ _id: new ObjectId(id) });

    return notification;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function GetAllNotifications() {
  try {
    const collection = database.client.db("MEAN").collection("notification");

    const notifications = await collection.find({}).toArray();

    return notifications;
  } catch (error) {
    console.error("Error during database query:", error);
    throw error;
  }
}

async function updateNotification(id, notification) {
  try {
    const collection = database.client.db("MEAN").collection("notification");

    const filter = { _id: new ObjectId(id) };

    const updateNotification = {
      $set: {
        notification: notification.notification,
        remarque: notification.remarque,
        temps: notification.temps,
        isRead: notification.isRead,
        idService: notification.idService,
        idDestinataire: notification.idDestinataire
      },
    };

    const result = await collection.updateOne(filter, updateNotification);

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

async function deleteNotificationById(idNotification) {
  try {
    // Specify the collection
    const collection = database.client.db("MEAN").collection("notification");

    // Delete the rendezVous document
    const result = await collection.deleteOne({
      _id: new ObjectId(idNotification),
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
    createNotification,
    getNotificationById,
    GetAllNotifications,
    updateNotification,
    deleteNotificationById
};
