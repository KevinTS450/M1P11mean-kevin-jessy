class paiement {
  constructor(
    montant,
    motif,
    temp,
    versed,
    { idRendezVous, start },
    { idEmp, nomEmp },
    { idClient, nomClient },
    { idServ, nomServ, prixServ, commissionServ }
  ) {
    this.montant = montant;
    this.motif = motif;
    this.temp = temp;
    this.versed = versed;
    this.rendezVous = { idRendezVous, start };
    this.employe = { idEmp, nomEmp };
    this.client = { idClient, nomClient };
    this.service = { idServ, nomServ, prixServ, commissionServ };
  }
}
module.exports = paiement;
