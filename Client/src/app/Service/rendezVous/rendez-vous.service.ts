import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Model/User/user';
import { RendezVous } from 'src/app/Model/rendez-vous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  projetUrl = 'http://localhost:5000/api/rendezVous/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<RendezVous[]>{
    return this.httpClient.get<RendezVous[]>(`${this.projetUrl}`+`findAll`);
  }

  public findByUser(user:User): Observable<RendezVous[]>{
    return this.httpClient.get<RendezVous[]>(`${this.projetUrl}`+`findByRoleAndId`+`/${user.role}`+`/${user._id}`+`/${user.name}`);
  }

  // public getBacklogById(id: number): Observable<any>{
  //   return this.httpClient.get<Backlog>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  // }

  public create(rendezVous:RendezVous): Observable<any>{
    return this.httpClient.post(`${this.projetUrl}`+`create`, rendezVous);
  }

  public update(id:string, rendezVous:RendezVous): Observable<any>{
    return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`, rendezVous);
  }
}
