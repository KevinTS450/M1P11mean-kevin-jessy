class paiement {
    constructor(montant, motif, temp, idRendezVous, idEmploye) {
        this.montant = montant;
        this.motif = motif;
        this.temp = temp;
        this.idRendezVous = idRendezVous;
        this.idEmploye = idEmploye;
    }
}
module.exports = paiement;