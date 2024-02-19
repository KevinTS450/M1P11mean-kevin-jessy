const express = require("express");
const router = express.Router();
const handlerInscription = require("../Controller/RegisterController/inscriptionHandler.js");
const authenticateToken = require("../JWT/jwtMiddleware");
const handlerLogin = require("../Controller/AuthController/loginHandler");
const HandlerUser = require("../Controller/UserController/UserHandler");
const mobileMoneyController = require("../Controller/MobileMoneyController/mobileMoneyCtrl.js");
const rendezVousController = require("../Controller/RendezVousController/rendezVousController.js");
const UploadController = require("../Controller/UploadController/UploadController.js");
const ThumbnailsController = require("../Controller/ThumbnailsController/thumbnailsController.js");
const PointageController = require("../Controller/PointageController/pointageController.js");
const ServiceController = require("../controller/ServiceTypeController/serviceController.js");

//USER
router.post("/user/inscription", handlerInscription);
router.get("/user/get-user", authenticateToken, HandlerUser.GetUserByToken);
router.post("/user/login", handlerLogin.loginUser);
router.post("/user/logout", handlerLogin.Logout);
router.get("/AllUser", HandlerUser.GetAllUser);
router.post("/upload", UploadController.uploadImage);
router.get("/path", ThumbnailsController.getImagePaths);
router.put("/user/update", HandlerUser.updateUser);
router.get("/user/isUserExist", HandlerUser.CheckUserExist);
router.get("/user/userByEmail", HandlerUser.GetUserByEmail);
router.patch("/user/activateAccount", HandlerUser.ActivateAccount);
router.patch("/user/newCode", HandlerUser.GenNewCode);
router.get("/user/isManagerExist", HandlerUser.CheckManagerExist);

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
router.put("/mobileMoneu/recharge");

//pointage
router.post("/pointage/createPointage", PointageController.createPointage);
router.get("/pointage/empPointage", PointageController.GetEmpPointageHandler);
router.post(
  "/pointage/updatePointage",
  PointageController.updatePointageHandler
);

//service
router.post("/service/create", ServiceController.createServiceController);
router.get("/service/list", ServiceController.ListSerivceController);
router.put("/service/update", ServiceController.UpdateServiceController);
router.delete("/service/delete", ServiceController.DeleteServiceController);
router.get("/service/getById", ServiceController.GetServiceByIdController);

router.post("/rendezVous/create", rendezVousController.createRendezVous);
router.get("/rendezVous/findAll", rendezVousController.GetAllRendezVous);
router.get("/rendezVous/findById/:id", rendezVousController.GetRendezVousById);
router.put("/rendezVous/updateById/:id", rendezVousController.updateRendezVous);
router.delete(
  "/rendezVous/deleteById/:id",
  rendezVousController.deleteRendezVous
);
router.get(
  "/rendezVous/intervalTime",
  rendezVousController.checkRendezVousAtIntervallOfTimeController
);

module.exports = router;
