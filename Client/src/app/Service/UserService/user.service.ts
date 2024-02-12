import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionService } from "src/app/pages/session/session.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = "http://localhost:5000/api/user";

  constructor(private http: HttpClient, private session: SessionService) {}
  public GetUserByToken(): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `${this.session.getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    return this.http.get<string>(`${this.baseUrl}/get-user`, {
      headers: headers,
    });
  }
}
