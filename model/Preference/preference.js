class preference {
  constructor(
    { idEmploye, nomEmploye },
    { idClient, nomClient },
    { idServ, nomServ, prixServ, commSer, durreServ, imageServ },
    type,
    idEmp
  ) {
    this.employe = { idEmploye, nomEmploye };
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
