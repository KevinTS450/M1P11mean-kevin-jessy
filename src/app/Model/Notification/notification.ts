export class Notification {
  _id: string;
  notification: string;
  remarque: string;
  date: string;
  isRead: boolean;
  destinataire: string;
  serviceConcerne: {
    idServ: string;
    nomServ: string;
    prixServ: string;
  };
  envoyeur: {
    idEnv: string;
    nomEnv: string;
    imageEnv: string;
  };
}
