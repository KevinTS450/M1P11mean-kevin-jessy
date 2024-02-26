import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServieType } from "src/app/Model/serviceType/servie-type";

@Injectable({
  providedIn: "root",
})
export class ServiceTypeService {
  constructor(private http: HttpClient) {}
  private baseUrl = "http://localhost:5000/api/service";
  public CreateService(service: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/create`, service);
  }

  public ListService(): Observable<ServieType[]> {
    return this.http.get<ServieType[]>(`${this.baseUrl}/list`);
  }

  public UpdateService(update: ServieType, id: string): Observable<ServieType> {
    return this.http.put<ServieType>(`${this.baseUrl}/update?id=${id}`, update);
  }

  public DeleteService(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete?id=${id}`);
  }
  public GetServiceById(id: string): Observable<ServieType> {
    return this.http.get<ServieType>(`${this.baseUrl}/getById?id=${id}`);
  }
}
