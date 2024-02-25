const PreferenceService = require("../../service/Preference/preference");
const preference = require("../../model/Preference/preference");
const socketIo = require("../../socketio");

async function AddPreferenceController(req, res, next) {
  try {
    const { employe, client, service, type, idEmp } = req.body;
    const preference_query = new preference(
      { idEmploye: employe.idEmploye, nomEmploye: employe.nomEmploye },
      { idClient: client.idClient, nomClient: client.nomClient },
      {
        idServ: service.idServ,
        nomServ: service.nomServ,
        prixServ: service.prixServ,
        commSer: service.commSer,
        durreServ: service.durreServ,
        imageServ: service.imageServ,
      },
      type,
      idEmp
    );

    PreferenceService.AddToPreference(preference_query);
    const socket = socketIo.getIO();
    if (preference_query.type === "service") {
      console.log("ato");
      const count = await PreferenceService.CountPreferences(
        preference_query.type,
        preference_query.client.idClient
      );
      console.log(count);
      socket.emit("countFavService", {
        event: "countFavService",
        count: count,
      });
    }

    return res.json({ pref: preference_query });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function CheckPreferenceController(req, res, next) {
  try {
    const { type, clientId, idService } = req.query;

    const preferencesExist = await PreferenceService.checkIfItPreferencesExist(
      type,
      clientId,
      idService
    );

    return res.json({ exists: preferencesExist });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function CountPreference(req, res, next) {
  try {
    const { type, clientId } = req.query;

    const count = await PreferenceService.CountPreferences(type, clientId);

    return res.json({ count: count });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function GetPreferenceController(req, res, next) {
  try {
    const { type, clientId } = req.query;
    const preference = await PreferenceService.GetPreference(type, clientId);
    return res.json({ preference: preference });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function RemovePreferenceController(req, res, next) {
  try {
    const { type, clientId } = req.query;
    const preference = await PreferenceService.removePreference(type, clientId);
    const getPrefNow = await PreferenceService.GetPreference(type, clientId);

    const socket = socketIo.getIO();
    socket.emit("removeFav", {
      event: "removeFav",
      preference: getPrefNow,
    });

    return res.json({ message: "preference removed", preference: preference });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  AddPreferenceController,
  CheckPreferenceController,
  CountPreference,
  GetPreferenceController,
  RemovePreferenceController,
};
