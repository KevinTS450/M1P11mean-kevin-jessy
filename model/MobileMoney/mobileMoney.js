class mobileMoney {
  constructor({ idUser, nomUser, emailUser }, operateurNom, monnaie) {
    this.user = { idUser, nomUser, emailUser };
    this.operateurNom = operateurNom;
    this.monnaie = monnaie;
  }
}
module.exports = mobileMoney;
