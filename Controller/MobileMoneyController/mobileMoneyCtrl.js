const MobileMoneyService = require("../../service/MobileMoney/mobileMoney");
const MobileMoney = require("../../model/MobileMoney/mobileMoney");

async function createMobileMoney(req, res, next) {
  try {
    const { user, operateurNom, monnaie } = req.body;
    const newMobileMoney = new MobileMoney(
      { idUs: user.idUser, nomUs: user.nom },
      operateurNom,
      monnaie
    );

    await MobileMoneyService.createMobileMoney(newMobileMoney);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}

const GetMobileMoneyById = async (req, res) => {
  try {
    // Assuming there is a MobileMoney model with findById method
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
    const { user, operateurNom, monnaie } = req.body;
    const newMobileMoney = new MobileMoney(
      { idUs: user.idUser, nomUs: user.nom },
      operateurNom,
      monnaie
    );

    await MobileMoneyService.updateMobileMoney(newMobileMoney);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}

async function deleteMobileMoney(req, res, next) {
  try {
    const id = req.params.id;

    await MobileMoneyService.deleteMobileMoneyById(id);

    res.status(200).json({ message: "MobileMoney registered successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
}

module.exports = {
  createMobileMoney,
  GetMobileMoneyById,
  GetAllMobileMoney,
  updateMobileMoney,
  deleteMobileMoney,
};
