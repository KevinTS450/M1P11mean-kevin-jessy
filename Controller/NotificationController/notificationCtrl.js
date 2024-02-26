const NotificationService = require("../../service/Notification/notification");
const Notification = require("../../model/Notification/notification");

async function createNotification(req, res, next) {
  try {
    const { notification, remarque, temps, isRead, idService, idDestinataire } = req.body;
    const newNotification = new Notification(
      notification,
      remarque,
      temps,
      isRead,
      idService,
      idDestinataire
    );

    await NotificationService.createNotification(newNotification);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

const GetNotificationById = async (req, res) => {
  try {
    console.log("Decoded MobileMoney ID in Controller:", req.params.id);

    const notification = await NotificationService.getNotificationById(
      req.params.id
    );
    console.log("MobileMoney Details:", notification);

    if (!notification) {
      return res.status(404).json({ message: "MobileMoney not found" });
    }

    res.json({ notification });
  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllNotifications = async (req, res) => {
  try {
    const AllNotifications = await NotificationService.GetAllNotifications();

    if (!AllNotifications) {
      return res.status(404).json({ message: "MobileMoneys not found" });
    } else {
      return res.json({ AllNotifications });
    }
  } catch (error) {
    console.error(error);
  }
};

async function updateNotificationById(req, res, next) {
  try {
    const { notification, remarque, temps, isSent, isRead, idService, idDestinataire } = req.body;
    console.log(req.body);
    const id = req.params.id;
    const newNotification = new Notification(
        notification,
        remarque,
        temps,
        isRead,
        idService,
        idDestinataire
    );

    await NotificationService.updateNotification(id, newNotification);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function deleteNotificationById(req, res, next) {
  try {
    const id = req.params.id;

    await NotificationService.deleteNotificationById(id);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
    createNotification,
    GetNotificationById,
    GetAllNotifications,
    updateNotificationById,
    deleteNotificationById
};
