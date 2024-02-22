class preference {
  constructor(
    { idEmploye, nomEmploye },
    { idClient, nomClient },
    { idServ, nomServ, prixServ, commSer },
    type
  ) {
    this.employe = { idEmploye, nomEmploye };
    this.client = { idClient, nomClient };
    this.service = {
      idServ,
      nomServ,
      prixServ,
      commSer,
    };
    this.type = type;
  }
}
module.exports = preference;
