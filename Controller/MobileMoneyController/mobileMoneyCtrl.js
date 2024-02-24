const MobileMoneyService = require("../../service/MobileMoney/mobileMoney");
const MobileMoney = require("../../model/MobileMoney/mobileMoney");

async function createMobileMoney(req, res, next) {
  try {
    const { user, operateurNom, monnaie } = req.body;
    const newMobileMoney = new MobileMoney(
      { idUser: user.idUser, nomUser: user.nomUser, emailUser: user.emailUser },
      operateurNom,
      monnaie
    );

    await MobileMoneyService.createMobileMoney(newMobileMoney);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

const GetMobileMoneyById = async (req, res) => {
  try {
    console.log("Decoded MobileMoney ID in Controller:", req.params.id);

    const mobileMoney = await MobileMoneyService.getMobileMoneyById(
      req.params.id
    );
    console.log("MobileMoney Details:", mobileMoney);

    if (!mobileMoney) {
      return res.status(404).json({ message: "MobileMoney not found" });
    }

    res.json({ mobileMoney });
  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
};

const GetMobileMoneyByUser = async (req, res) => {
  try {
    
    const idUser = req.params.id;
    const nomUser = req.params.nom;
    const emailUser = req.params.email;
    console.log(req.params);
    let mobileMoney = await MobileMoneyService.getMobileMoneyByUser(idUser, nomUser, emailUser);

    console.log("MobileMoney Details:", mobileMoney);

    if (!mobileMoney) {
      const newMobileMoney = new MobileMoney(
        { idUser, nomUser, emailUser},
        "Airtel Money",
        0,
        "en attente"
      );
      mobileMoney = await MobileMoneyService.createMobileMoney(newMobileMoney);
      res.status(200).json({ mobileMoney });
    } else res.json({ mobileMoney });

  } catch (error) {
    console.error(error);
    +res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllMobileMoney = async (req, res) => {
  try {
    const AllMobileMoney = await MobileMoneyService.GetAllMobileMoney();

    if (!AllMobileMoney) {
      return res.status(404).json({ message: "MobileMoneys not found" });
    } else {
      return res.json({ AllMobileMoney });
    }
  } catch (error) {
    console.error(error);
  }
};

async function updateMobileMoney(req, res, next) {
  try {
    const { _id ,user, operateurNom, monnaie, status } = req.body;
    const newMobileMoney = new MobileMoney(
      { idUser: user._id, nomUser: user.name, emailUser: user.email },
      operateurNom,
      monnaie,
      status
    );
    newMobileMoney._id = _id;

    await MobileMoneyService.updateMobileMoney(newMobileMoney);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}
async function RechargeMobileMoneyControlleur(req, res, next) {
  try {
    const { user, operateurNom, monnaie } = req.body;
    const newMobileMoney = new MobileMoney(
      { idUser: user.idUser, nomUser: user.nom },
      operateurNom,
      monnaie
    );

    await MobileMoneyService.RechargeMobileMoney(newMobileMoney);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function deleteMobileMoney(req, res, next) {
  try {
    const id = req.params.id;

    await MobileMoneyService.deleteMobileMoneyById(id);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMobileMoney,
  GetMobileMoneyById,
  GetMobileMoneyByUser,
  GetAllMobileMoney,
  updateMobileMoney,
  deleteMobileMoney,
  RechargeMobileMoneyControlleur,
};
