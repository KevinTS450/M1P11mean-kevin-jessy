class rendezVous {
  constructor(
    { idEmployee, nomEmployee },
    { idClient, nomClient },
    { idService, nom, prix, durre, image, commission },
    start,
    end,
    isDone,
    isConfirmed,
    status,
    isCancel,
    onGoing
  ) {
    this.employee = { idEmployee, nomEmployee };
    this.client = { idClient, nomClient };
    this.serviceAsked = { idService, nom, prix, durre, image, commission };
    this.start = start;
    this.end = end;
    this.isDone = isDone;
    this.isCancel = isCancel;
    this.isConfirmed = isConfirmed;
    this.status = status;
    this.onGoing = onGoing;
  }
}
module.exports = rendezVous;
