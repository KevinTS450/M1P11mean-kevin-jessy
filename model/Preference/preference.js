class preference {
  constructor(
    { idEmploye, nomEmploye, prenomEmploye, emailEmploye, imageEmploye },
    { idClient, nomClient },
    { idServ, nomServ, prixServ, commSer, durreServ, imageServ },
    type,
    idEmp
  ) {
    this.employe = {
      idEmploye,
      nomEmploye,
      imageEmploye,
      prenomEmploye,
      emailEmploye,
    };
    this.client = { idClient, nomClient };
    this.service = {
      idServ,
      nomServ,
      prixServ,
      commSer,
      durreServ,
      imageServ,
    };
    this.type = type;
    this.idEmp = idEmp;
  }
}
module.exports = preference;
