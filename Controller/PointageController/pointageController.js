const PointageService = require("../../service/Pointage/pointage");
const Pointage = require("../../model/pointage/pointage");
const socketIo = require("../../socketio");

async function createPointage(req, res, next) {
  try {
    const { employe, idEmp, start_time, end_time } = req.body;
    const pointage = new Pointage(
      {
        emailEmp: employe.emailEmp,
        nomEmp: employe.nomEmp,
      },
      idEmp,
      start_time,
      end_time
    );

    const pointageRes = await PointageService.CreatePointageForEmp(pointage);

    res
      .status(200)
      .json({ message: "pointage created successfully :", pointageRes });
  } catch (error) {
    next(error);
  }
}

async function GetEmpPointageHandler(req, res, next) {
  try {
    const { id } = req.query;
    const pointage = await PointageService.GetEmpPointage(id);
    console.log(pointage);
    return res.status(200).json({ pointage: pointage });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function updatePointageHandler(req, res, next) {
  try {
    const { idEmp, start_time, end_time } = req.body;

    const updateFields = {};
    if (start_time) updateFields.start_time = start_time;
    if (end_time) updateFields.end_time = end_time;

    const response = await PointageService.updatePointageEmp(
      idEmp,
      updateFields
    );
    const io = socketIo.getIO();
    io.emit("pointageUpdated", {
      event: "pointageUpdated",
      pointage: updateFields,
    });

    res.status(200).json({ user: response });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
module.exports = {
  createPointage,
  GetEmpPointageHandler,
  updatePointageHandler,
};
