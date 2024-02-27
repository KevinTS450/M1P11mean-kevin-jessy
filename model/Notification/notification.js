class offreSpeciale {
  constructor(
    notification,
    remarque,
    date,
    isRead,
    { idServ, nomServ, prixServ },
    destinataire,
    { idEnv, nomEnv, imageEnv }
  ) {
    this.notification = notification;
    this.remarque = remarque;
    this.date = date;
    this.isRead = isRead;
    this.serviceConcerne = { idServ, nomServ, prixServ };
    this.destinataire = destinataire;
    this.envoyeur = { idEnv, nomEnv, imageEnv };
  }
}
module.exports = offreSpeciale;
