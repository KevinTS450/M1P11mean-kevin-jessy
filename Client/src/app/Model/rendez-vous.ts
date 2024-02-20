export class RendezVous {
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
      start: string; // Assuming this represents a date and time string
      end: string; // Assuming this represents a date and time string
      isDone: boolean;
      isConfirmed: boolean;
}
