import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pointage } from "src/app/Model/pointage/pointage";

@Injectable({
  providedIn: "root",
})
export class PointageService {
  private baseUrl = "https://m1p11mean-kevin-jessy-1.onrender.com/api/pointage";

  constructor(private http: HttpClient) {}

  public CreatePointageForEmp(data: Pointage): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/createPointage`, data);
  }
  public GetPointageEmp(id: string): Observable<Pointage> {
    return this.http.get<Pointage>(`${this.baseUrl}` + `/empPointage?id=${id}`);
  }
  public UpdatePointageForEmp(data: {}): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/updatePointage`, data);
  }
}
