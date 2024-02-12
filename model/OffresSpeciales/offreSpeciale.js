class offreSpeciale {
    constructor(promotion, description, [{ idServ, nomServ, prixServ }], start, end) {
        this.promotion = promotion;
        this.description = description;
        this.serviceConcerne = { idService: idServ, nom: nomServ, prix: prixServ}
        this.start = start;
        this.end = end;
    }
}
module.exports = offreSpeciale;