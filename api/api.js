const express = require("express");
const router = express.Router();
const handlerInscription = require("../Controller/RegisterController/inscriptionHandler.js");
const authenticateToken = require("../JWT/jwtMiddleware");
const handlerLogin = require("../Controller/AuthController/loginHandler");
const HandlerUser = require("../Controller/UserController/UserHandler");
const mobileMoneyController = require("../Controller/MobileMoneyController/mobileMoneyCtrl.js");
const rendezVousController = require("../Controller/RendezVousController/rendezVousController.js");

/**************************                 User            ***********************************/

router.post("/inscription", handlerInscription);
router.get("/get-user", authenticateToken, HandlerUser.GetUserByToken);
router.post("/login", handlerLogin);
router.get("/AllUser", HandlerUser.GetAllUser);
router.get("/isUserExist", HandlerUser.CheckUserExist);
router.get("/userByEmail", HandlerUser.GetUserByEmail);
router.patch("/activateAccount", HandlerUser.ActivateAccount);

router.post("/mobileMoney/create", mobileMoneyController.createMobileMoney);
router.get("/mobileMoney/findAll", mobileMoneyController.GetAllMobileMoney);
router.get(
  "/mobileMoney/findById/:id",
  mobileMoneyController.GetMobileMoneyById
);
router.put(
  "/mobileMoney/updateById/:id",
  mobileMoneyController.updateMobileMoney
);
router.delete(
  "/mobileMoney/deleteById/:id",
  mobileMoneyController.deleteMobileMoney
);

/**************************                 RENDEZVOUS            ********************************* */

router.post("/rendezVous/create", rendezVousController.createRendezVous);
router.get("/rendezVous/findAll", rendezVousController.GetAllRendezVous);
router.get("/rendezVous/findById/:id", rendezVousController.GetRendezVousById);
router.put("/rendezVous/updateById/:id", rendezVousController.updateRendezVous);
router.delete(
  "/rendezVous/deleteById/:id",
  rendezVousController.deleteRendezVous
);

module.exports = router;
