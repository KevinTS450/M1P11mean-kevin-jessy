const NotificationService = require("../../service/notification/notification");
const notification_model = require("../../model/notification/notification");
const socketIo = require("../../socketio");

async function CreateNotifController(req, res, next) {
  try {
    const {
      notification,
      remarque,
      date,
      isRead,
      serviceConcerne,
      destinataire,
      envoyeur,
    } = req.body;

    const notification_query = new notification_model(
      notification,
      remarque,
      date,
      isRead,
      {
        idServ: serviceConcerne.idServ,
        nomServ: serviceConcerne.nomServ,
        prixServ: serviceConcerne.prixServ,
      },
      destinataire,
      {
        idEnv: envoyeur.idEnv,
        nomEnv: envoyeur.nomEnv,
        imageEnv: envoyeur.imageEnv,
      }
    );

    const save = await NotificationService.CreateNotification(
      notification_query
    );
    if (save) {
      return res
        .status(200)
        .json({ notification: save, message: "notification saved" });
    } else {
      return res.json({ message: "internal server error" });
    }
  } catch (error) {
    console.error(error);
  }
}

async function findNotif(req, res, next) {
  try {
    const { id } = req.query;
    const notif = await NotificationService.FindNotifByIdUser(id);
    if (notif) {
      return res.status(200).json({ notif: notif });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getCountNotifNoReadController(req, res, next) {
  try {
    const { id } = req.query;
    const count = await NotificationService.getCountNotifNotRead(id);

    if (count) {
      return res.status(200).json({ count: count, message: "count of notif" });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateLectureController(req, res, next) {
  try {
    const { id } = req.query;
    const update = await NotificationService.UpdateLecture(id);

    if (update) {
      const socketResponse = socketIo.getIO();
      const count = await NotificationService.getCountNotifNotRead(id);
      console.log(count);
      socketResponse.emit("countNotif", {
        event: "countNotif",
        count: count,
      });
      socketResponse.emit("read", {
        event: "read",
        data: "notif read",
      });

      return res.status(200).json({ update: update, message: "notif updated" });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  CreateNotifController,
  findNotif,
  getCountNotifNoReadController,
  updateLectureController,
};
