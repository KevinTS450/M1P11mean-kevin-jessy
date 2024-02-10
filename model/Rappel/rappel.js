class rappel {
    constructor({idEmp, nomEmp}, {idCli, nomCli}, moment, note) {
        this.employe = { idEmployee: idEmp, nomEmployee: nomEmp };
        this.client = { idClient: idCli, nomClient: nomCli };
        this.moment = moment;
        this.note = note;
    }
}
module.exports = rappel;
  