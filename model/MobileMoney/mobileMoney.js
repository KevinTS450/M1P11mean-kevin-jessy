class mobileMoney {
  constructor({ idUser, nomUser, emailUser }, operateurNom, monnaie, status) {
    this.user = { idUser, nomUser, emailUser };
    this.operateurNom = operateurNom;
    this.monnaie = monnaie;
    this.status = status;
  }
}
module.exports = mobileMoney;
