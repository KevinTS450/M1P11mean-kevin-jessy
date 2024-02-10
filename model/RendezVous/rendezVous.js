class rendezVous {
    constructor({idEmp, nomEmp}, {idCli, nomCli}, {idServ, nomServ, prixServ}, start, end, isDone, isConfirmed) {
        this.employe = { idEmployee: idEmp, nomEmployee: nomEmp };
        this.client = { idClient: idCli, nomClient: nomCli };
        this.serviceAsked = { idService: idServ, nom:nomServ, prix: prixServ };
        this.start = start
        this.end = end;
        this.isDone = isDone;
        this.isConfirmed = isConfirmed;
    }
  }
  module.exports = rendezVous;
  