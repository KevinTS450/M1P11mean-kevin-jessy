class rendezVous {
  constructor(
    { idEmployee, nomEmployee },
    { idClient, nomClient },
    { idService, nom, prix },
    start,
    end,
    isDone,
    isConfirmed,
    status
  ) {
    this.employee = { idEmployee, nomEmployee };
    this.client = { idClient, nomClient };
    this.serviceAsked = { idService, nom, prix };
    this.start = start;
    this.end = end;
    this.isDone = isDone;
    this.isConfirmed = isConfirmed;
    this.status = status;
  }
}
module.exports = rendezVous;
