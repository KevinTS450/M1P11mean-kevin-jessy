export class Paiement {
  paiement: {};
  _id: string;
  montant: number;
  motif: string;
  temp: string;
  versed: boolean;
  rendezVous: {
    idRendezVous: string;
    start: string;
  };
  employe: {
    idEmp: string;
    nomEmp: string;
  };
  client: {
    idClient: string;
    nomClient: string;
  };
  service: {
    idServ: string;
    nomServ: string;
    prixServ: number;
    commissionServ: number;
  };
  idEmploye: string;
}
