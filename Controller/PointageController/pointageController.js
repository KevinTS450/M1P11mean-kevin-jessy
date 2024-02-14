const PointageService = require("../../service/Pointage/pointage");
const Pointage = require("../../model/pointage/pointage");

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
    const { idEmp, nomEmp, emailEmp, start_time, end_time } = req.body;
    const pointage = new Pointage(
      { nomEmp, emailEmp },
      idEmp,
      start_time,
      end_time
    );
    const response = await PointageService.updatePointageEmp(pointage);
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
