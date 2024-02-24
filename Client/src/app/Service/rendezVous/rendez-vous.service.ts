import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/Model/User/user";
import { RendezVous } from "src/app/Model/RendezVous/rendez-vous";

@Injectable({
  providedIn: "root",
})
export class RendezVousService {
  projetUrl = "http://localhost:5000/api/rendezVous/";

  constructor(private httpClient: HttpClient) {}

  public list(): Observable<RendezVous[]> {
    return this.httpClient.get<RendezVous[]>(`${this.projetUrl}` + `findAll`);
  }

  public findByUser(user: User): Observable<RendezVous[]> {
    return this.httpClient.get<RendezVous[]>(
      `${this.projetUrl}` +
        `findByRoleAndId` +
        `/${user.role}` +
        `/${user._id}` +
        `/${user.name}`
    );
  }
  public findByUserConfirmed(user: User): Observable<RendezVous[]> {
    return this.httpClient.get<RendezVous[]>(
      `${this.projetUrl}` +
        `getRdvConfirmed` +
        `?role=${user.role}` +
        `&id=${user._id}` +
        `&name=${user.name}`
    );
  }

  public create(rendezVous: RendezVous): Observable<any> {
    return this.httpClient.post(`${this.projetUrl}` + `create`, rendezVous);
  }

  public update(rendezVous: RendezVous): Observable<any> {
    return this.httpClient.put(`${this.projetUrl}` + `update`, rendezVous);
  }

  public update(id:string, rendezVous:RendezVous): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, rendezVous);
  }
  
  public ChangeStateRdv(
    clientId: string,
    idEmp: string,
    stateFor: string
  ): Observable<RendezVous> {
    return this.httpClient.put<RendezVous>(
      `${this.projetUrl}changeState?clientId=${clientId}&idEmp=${idEmp}&stateFor=${stateFor}`,
      {}
    );
  }
}
