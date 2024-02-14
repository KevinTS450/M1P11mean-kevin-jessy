import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pointage } from "src/app/Model/pointage/pointage";

@Injectable({
  providedIn: "root",
})
export class PointageService {
  private baseUrl = "http://localhost:5000/api/pointage";

  constructor(private http: HttpClient) {}

  public CreatePointageForEmp(data: Pointage): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/createPointage`, data);
  }
  public GetPointageEmp(id: string): Observable<Pointage> {
    return this.http.get<Pointage>(`${this.baseUrl}` + `/empPointage?id=${id}`);
  }
}
