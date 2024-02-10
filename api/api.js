const express = require("express");
const router = express.Router();
const handlerInscription = require("../Controller/RegisterController/inscriptionHandler.js");
const authenticateToken = require("../JWT/jwtMiddleware");
const handlerLogin = require("../Controller/AuthController/loginHandler");
const HandlerUser = require("../Controller/UserController/UserHandler");

/**************************                 User            ***********************************/

router.post("/inscription", handlerInscription);
router.get("/get-user", authenticateToken, HandlerUser.GetUserByToken);
router.post("/login", handlerLogin);
router.get("/AllUser", HandlerUser.GetAllUser);


/**************************                 MOBILEMONEY            ***********************************/

router.post("/mobileMoney/create", mobileMoneyController.createMobileMoney)
router.get("/mobileMoney/findAll", mobileMoneyController.GetAllMobileMoney)
router.get("/mobileMoney/findById/:id", mobileMoneyController.GetMobileMoneyById)
router.put("/mobileMoney/updateById/:id", mobileMoneyController.updateMobileMoney)
router.delete("/mobileMoney/deleteById/:id", mobileMoneyController.deleteMobileMoney)

module.exports = router;
