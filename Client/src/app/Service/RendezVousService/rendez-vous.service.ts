import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RendezVous } from "src/app/Model/rendezVous/rendez-vous";

@Injectable({
  providedIn: "root",
})
export class RendezVousService {
  private baseUrl = "http://localhost:5000/api/rendezVous";

  constructor(private http: HttpClient) {}

  public CreateRendezVous(rendezVous: RendezVous): Observable<RendezVous> {
    return this.http.post<RendezVous>(`${this.baseUrl}/create`, rendezVous);
  }
}
