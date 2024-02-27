const PaiementService = require("../../service/Paiement/paiement");
const Paiement = require("../../model/Paiement/paiement");
const socketIo = require("../../socketio");

async function createPaiement(req, res, next) {
  try {
    const {
      montant,
      motif,
      temp,
      versed,
      rendezVous,
      employe,
      client,
      service,
    } = req.body;
    const newPaiement = new Paiement(
      montant,
      motif,
      temp,
      versed,
      { idRendezVous: rendezVous.idRendezVous, start: rendezVous.start },
      { idEmp: employe.idEmp, nomEmp: employe.nomEmp },
      { idClient: client.idClient, nomClient: client.nomClient },
      {
        idServ: service.idServ,
        nomServ: service.nomServ,
        prixServ: service.prixServ,
        commissionServ: service.commissionServ,
      }
    );

    await PaiementService.createPaiement(newPaiement);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

const GetPaiementById = async (req, res) => {
  try {
    console.log("Decoded MobileMoney ID in Controller:", req.params.id);

    const paiement = await PaiementService.getPaiementById(req.params.id);
    console.log("MobileMoney Details:", paiement);

    if (!paiement) {
      return res.status(404).json({ message: "MobileMoney not found" });
    }

    res.json({ paiement });
  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllPaiements = async (req, res) => {
  try {
    const AllPaiements = await PaiementService.GetAllPaiements();

    if (!AllPaiements) {
      return res.status(404).json({ message: "MobileMoneys not found" });
    } else {
      return res.json({ AllPaiements });
    }
  } catch (error) {
    console.error(error);
  }
};

async function updatePaiementById(req, res, next) {
  try {
    const { montant, motif, temp, idRendezVous, idEmploye } = req.body;
    console.log(req.body);
    const id = req.params.id;
    const newPaiement = new Paiement(
      montant,
      motif,
      temp,
      idRendezVous,
      idEmploye
    );

    await PaiementService.updatePaiement(id, newPaiement);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function deletePaiementById(req, res, next) {
  try {
    const id = req.params.id;

    await PaiementService.deletePaiementById(id);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function versementEmploye(req, res, next) {
  try {
    const { idEmp, monaie } = req.query;
    const versement = await PaiementService.versementEmploye(idEmp, monaie);
    if (versement) {
      const socketResponse = socketIo.getIO();
      socketResponse.emit("versed", {
        event: "versed",
        data: "versement effectuer",
      });
      return res
        .status(200)
        .json({ message: "versement effectuer", versement: versement });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createPaiement,
  GetPaiementById,
  GetAllPaiements,
  updatePaiementById,
  deletePaiementById,
  versementEmploye,
};
