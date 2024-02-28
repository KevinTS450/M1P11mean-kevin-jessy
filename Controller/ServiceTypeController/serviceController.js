const ServiceTypeService = require("../../service/ServiceType/Service");
const Service = require("../../model/Service/service");
const socketIo = require("../../socketio");

async function createServiceController(req, res, next) {
  try {
    const { nom, prix, durre, commission, image } = req.body;
    const service = new Service(nom, prix, durre, commission, image);
    const result = await ServiceTypeService.createService(service);
    if (result) {
      res
        .status(200)
        .json({ message: "service created", status: result, result: service });
    } else {
      res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function ListSerivceController(req, res, next) {
  try {
    const list = await ServiceTypeService.ListService();
    if (list) {
      res.status(200).json({ message: "List service loaded", service: list });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function GetServiceByIdController(req, res, next) {
  try {
    const { id } = req.query;
    const serviceById = await ServiceTypeService.GetServiceById(id);
    if (serviceById) {
      res
        .status(200)
        .json({ message: "List service loaded", service: serviceById });
    } else {
      return res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function UpdateServiceController(req, res, next) {
  try {
    const { nom, prix, durre, commission, image } = req.body;
    const { id } = req.query;
    const service = new Service(nom, prix, durre, commission, image);
    await ServiceTypeService.updateService(service, id);

    res.status(200).json({ message: " service updated" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function DeleteServiceController(req, res, next) {
  try {
    const id = req.query;

    await ServiceTypeService.deleteService(id);
    const list = await ServiceTypeService.ListService();
    const io = socketIo.getIO();
    io.emit("serviceDeleted", {
      event: "serviceDeleted",
      service: list,
    });
    res.status(200).json({ message: "service deleted" });
  } catch (error) {
    next(error);
    console.error(error);
    next(error);
  }
}
module.exports = {
  createServiceController,
  ListSerivceController,
  UpdateServiceController,
  DeleteServiceController,
  GetServiceByIdController,
};
