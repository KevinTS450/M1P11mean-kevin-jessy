import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MobileMoney } from "src/app/Model/MobileMoney/mobile-money";

@Injectable({
  providedIn: "root",
})
export class MobileMoneyService {
  constructor(private http: HttpClient) {}
  private baseUrl = "http://localhost:5000/api/mobileMoney";

  public createMobileMoney(data: MobileMoney): Observable<MobileMoney> {
    return this.http.post<MobileMoney>(`${this.baseUrl}/create`, data);
  }
}
