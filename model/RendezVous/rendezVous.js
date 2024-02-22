class rendezVous {
  constructor(
    { idEmp, nomEmp },
    { idClient, nomClient },
    { idServ, nomServ, prixServ },
    start,
    end,
    isDone,
    isConfirmed
  ) {
    this.employe = { idEmp, nomEmp };
    this.client = { idClient, nomClient };
    this.serviceAsked = { idServ, nomServ, prixServ };
    this.start = start;
    this.end = end;
    this.isDone = isDone;
    this.isConfirmed = isConfirmed;
  }
}
module.exports = rendezVous;
