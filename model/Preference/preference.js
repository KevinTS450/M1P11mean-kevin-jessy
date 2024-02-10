class preference {
    constructor({idEmp, nomEmp}, [{ idCli, nomCli, rangCli, compteurCli } ], [{ idServ, nomServ, prixServ ,rang: rangSer, compteur: compteurServ }]) {
        this.employe = { idEmployee: idEmp, nomEmployee: nomEmp };
        this.client = [{ idClient: idCli, nomClient: nomCli, rang: rangCli, compteur: compteurCli }];
        this.service = [{ idService: idServ, nom: nomServ, prix: prixServ ,rang: rangSer, compteur: compteurServ }];
    }
}
module.exports = preference;
  