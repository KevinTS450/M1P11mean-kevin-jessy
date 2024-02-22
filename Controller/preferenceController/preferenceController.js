const PreferenceService = require("../../service/Preference/preference");
const preference = require("../../model/Preference/preference");

async function AddPreferenceController(req, res, next) {
  try {
    const { employe, client, service, type } = req.body;
    const preference_query = new preference(
      { idEmploye: employe.idEmploye, nomEmploye: employe.nomEmploye },
      { idClient: client.idClient, nomClient: client.nomClient },
      {
        idServ: service.idServ,
        nomServ: service.nomServ,
        prixServ: service.prixServ,
        commSer: service.commSer,
      },
      type
    );

    PreferenceService.AddToPreference(preference_query);

    return res.json({ pref: preference_query });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function CheckPreferenceController(req, res, next) {
  try {
    const { type, clientId } = req.query;

    const preferencesExist = await PreferenceService.checkIfItPreferencesExist(
      type,
      clientId
    );

    return res.json({ exists: preferencesExist });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
async function CountPreference(req, res, next) {
  try {
    const { clientId } = req.query;

    const count = await PreferenceService.CountPreferences(clientId);

    return res.json({ count: count });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  AddPreferenceController,
  CheckPreferenceController,
  CountPreference,
};
