export class RendezVous {
  _id: string;
  employee: {
    idEmployee: string;
    nomEmployee: string;
  };
  client: {
    idClient: string;
    nomClient: string;
  };
  serviceAsked: {
    idService: string;
    nom: string;
    prix: number;
    durre: number;
    image: string;
  };
  start: string;
  end: string;
  isDone: boolean;
  isConfirmed: boolean;
  isCancel: boolean;
  onGoing: boolean;
  status: string;
}
