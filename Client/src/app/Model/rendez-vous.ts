export class RendezVous {
  _id:string;
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
  };
  start: string;
  end: string;
  isDone: boolean;
  isConfirmed: boolean;
}
