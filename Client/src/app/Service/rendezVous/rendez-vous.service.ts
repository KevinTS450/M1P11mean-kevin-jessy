import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RendezVous } from 'src/app/Model/rendez-vous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  projetUrl = 'http://localhost:5000/api/RendezVous/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<RendezVous[]>{
    return this.httpClient.get<RendezVous[]>(`${this.projetUrl}`+`findAll`);
  }

  // public getBacklogById(id: number): Observable<any>{
  //   return this.httpClient.get<Backlog>(`${this.projetUrl}`+`detail`+`/${id}`, this.HttpOptions);
  // }

  // public create(evenementProjet: Backlog,userId:string): Observable<any>{
  //   return this.httpClient.post(`${this.projetUrl}`+`save`+`/${userId}`, evenementProjet, this.HttpOptions);
  // }

  // public update(id: number, evenementProjet: Backlog,user:string): Observable<any>{
  //   return this.httpClient.put(`${this.projetUrl}`+`update`+`/${id}`+`/${user}`, evenementProjet, this.HttpOptions);
  // }
}
