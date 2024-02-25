const RendezVousService = require("../../service/RendezVous/rendezVous");
const RendezVous = require("../../model/RendezVous/rendezVous");
const socketIo = require("../../socketio");

async function createRendezVous(req, res, next) {
  try {
    const {
      employee,
      client,
      serviceAsked,
      start,
      end,
      isDone,
      isConfirmed,
      status,
      isCancel,
      onGoing,
    } = req.body;
    console.log(req.body);
    const newRendezVous = new RendezVous(
      { idEmployee: employee.idEmployee, nomEmployee: employee.nomEmployee },
      { idClient: client.idClient, nomClient: client.nomClient },
      {
        idService: serviceAsked.idService,
        nom: serviceAsked.nom,
        prix: serviceAsked.prix,
        durre: serviceAsked.durre,
        image: serviceAsked.image,
      },
      start,
      end,
      isDone,
      isConfirmed,
      status,
      isCancel,
      onGoing
    );

    await RendezVousService.createRendezVous(newRendezVous);

    res.status(200).json({ message: "RendezVous registered successfully" });
  } catch (error) {
    next(error);
  }
}
async function checkRendezVousAtIntervallOfTimeController(req, res, next) {
  try {
    const { start, end, employeId } = req.query;
    const rendezVous = await RendezVousService.checkRendezVousInInterval(
      start,
      end,
      employeId
    );
    if (rendezVous) {
      return res
        .status(200)
        .json({ message: "Employe disponible", emp: rendezVous });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    console.error(error);
  }
}

const GetRendezVousById = async (req, res) => {
  try {
    console.log("Decoded RendezVous ID in Controller:", req.params.id);

    const rendezVous = await RendezVousService.getRendezVousById(req.params.id);
    console.log("RendezVous Details:", rendezVous);

    if (!rendezVous) {
      return res.status(404).json({ message: "RendezVous not found" });
    }

    res.json({ rendezVous });
  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllRendezVous = async (req, res) => {
  try {
    const AllRendezVous = await RendezVousService.GetAllRendezVous();

    if (!AllRendezVous) {
      return res.status(404).json({ message: "RendezVouss not found" });
    } else {
      return res.json({ AllRendezVous });
    }
  } catch (error) {
    console.error(error);
  }
};

async function updateRendezVous(req, res, next) {
  try {
    const {
      employee,
      client,
      serviceAsked,
      start,
      end,
      isDone,
      isConfirmed,
      status,
    } = req.body;

    const id = req.params.id;

    const newRendezVous = new RendezVous(
      { idEmployee: employee.idEmployee, nomEmployee: employee.nomEmployee },
      { idClient: client.idClient, nomClient: client.nomClient },
      {
        idService: serviceAsked.idService,
        nom: serviceAsked.nom,
        prix: serviceAsked.prix,
      },
      start,
      end,
      isDone,
      isConfirmed,
      status
    );
    console.log(newRendezVous);

    await RendezVousService.updateRendezVous(id, newRendezVous);

    res.status(200).json({ message: "RendezVous registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function deleteRendezVous(req, res, next) {
  try {
    const id = req.params.id;

    await RendezVousService.deleteRendezVousById(id);

    res.status(200).json({ message: "RendezVous registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function getRendezVousByRoleAndId(req, res, next) {
  try {
    console.log("Decoded RendezVous ID in Controller:", req.params.id);

    const rendezVous =
      await RendezVousService.getRendezVousByRoleAndIdAndNom_user(
        req.params.role,
        req.params.id,
        req.params.nom_user
      );
    console.log("RendezVous Details:", rendezVous);

    if (!rendezVous) {
      return res.status(404).json({ message: "RendezVous not found" });
    }

    res.json({ rendezVous });
  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
}
async function getRendezVousByRoleAndIdConfirmed(req, res, next) {
  try {
    console.log("Decoded RendezVous ID in Controller:");

    const { role, id, name } = req.query;
    console.log(id);
    const rendezVous =
      await RendezVousService.getRendezVousByRoleAndIdAndNom_userConfirmed(
        role,
        id,
        name
      );
    console.log("RendezVous Details:", rendezVous);

    if (!rendezVous) {
      return res.status(404).json({ message: "RendezVous not found" });
    }

    res.json({ rendezVous });
  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
}

async function ChangeStateRdvController(req, res, next) {
  try {
    const { clientId, idEmp, stateFor } = req.query;

    const update = await RendezVousService.ChangeStateRendezVous(
      idEmp,
      clientId,

      stateFor
    );

    if (update) {
      const socketResponse = socketIo.getIO();

      socketResponse.emit("ChangeState", {
        event: "ChangeState",
        data: "state changed",
      });
      return res.status(200).json({ message: "rendez vous confirmer" });
    } else {
      return res.status(200).json({ message: "internal server error" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
module.exports = {
  createRendezVous,
  GetRendezVousById,
  GetAllRendezVous,
  updateRendezVous,
  deleteRendezVous,
  getRendezVousByRoleAndId,
  checkRendezVousAtIntervallOfTimeController,
  ChangeStateRdvController,
  getRendezVousByRoleAndIdConfirmed,
};
