class mobileMoney {
    constructor({ idUs, nomUs }, operateurNom, monnaie) {
        this.user = {idUser: idUs, nom: nomUs };
        this.operateurNom = operateurNom;
        this.monnaie = monnaie;
    }
}
module.exports = mobileMoney;