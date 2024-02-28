import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MobileMoney } from "src/app/Model/MobileMoney/mobile-money";
import { User } from "src/app/Model/User/user";

@Injectable({
  providedIn: "root",
})
export class MobileMoneyService {
  constructor(private http: HttpClient) {}
  private baseUrl =
    "https://m1p11mean-kevin-jessy-1.onrender.com/api/mobileMoney";

  public createMobileMoney(data: MobileMoney): Observable<MobileMoney> {
    return this.http.post<MobileMoney>(`${this.baseUrl}/create`, data);
  }

  public updateMobileMoney(mobileMoney: MobileMoney): Observable<any> {
    return this.http.put(
      `${this.baseUrl}` + `/updateById` + `/${mobileMoney._id}`,
      mobileMoney
    );
  }

  public getMyMobileMoney(user: User): Observable<MobileMoney> {
    return this.http.get<MobileMoney>(
      `${this.baseUrl}/findByUser` +
        `/${user._id}` +
        `/${user.name}` +
        `/${user.email}`
    );
  }
}
