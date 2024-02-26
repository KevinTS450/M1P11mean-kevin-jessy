class notification {
    constructor(notification, remarque, temps, isRead, idService, idDestinataire) {
        this.notification = notification;
        this.remarque = remarque;
        this.temps = temps;
        this.isRead = isRead;
        this.idService = idService;
        this.idDestinataire = idDestinataire;
    }
}
module.exports = notification;
