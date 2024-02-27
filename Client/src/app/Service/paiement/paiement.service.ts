import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Paiement } from "src/app/Model/paiement/paiement";

@Injectable({
  providedIn: "root",
})
export class PaiementService {
  constructor(private http: HttpClient) {}
  private baseUrl = "http://localhost:5000/api/Paiement";

  public createPaiement(data: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.baseUrl}/create`, data);
  }

  public updatePaiement(Paiement: Paiement): Observable<any> {
    return this.http.put(
      `${this.baseUrl}` + `/updateById` + `/${Paiement._id}`,
      Paiement
    );
  }

  public getAllPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.baseUrl}/findAll`);
  }

  public getPaiementById(paiement: Paiement): Observable<Paiement> {
    return this.http.get<Paiement>(
      `${this.baseUrl}/findById` + `/${paiement._id}`
    );
  }

  public versementEmployer(idemp: string, monnaie: number): Observable<string> {
    return this.http.patch<string>(
      `${this.baseUrl}/versement?idEmp=${idemp}&monaie=${monnaie}`,
      {}
    );
  }
}
