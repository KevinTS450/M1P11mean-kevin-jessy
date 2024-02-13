import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionService } from "src/app/pages/session/session.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:5000/api/user";

  constructor(private http: HttpClient, private session: SessionService) {}

  public Auth(data: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/login`, data);
  }
  public Logout(): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: this.session.getToken(),
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    return this.http.post<string>(`${this.baseUrl}/logout`, null, {
      headers: headers,
    });
  }

  public CheckUser(email: string): Observable<string> {
    return this.http.get<string>(
      `${this.baseUrl}` + `/isUserExist?email=${email}`
    );
  }

  public GetUserByEmail(email: string): Observable<string> {
    return this.http.get<string>(
      `${this.baseUrl}` + `/userByEmail?email=${email}`
    );
  }
  public ActivateAccount(email: string): Observable<string> {
    return this.http.patch<string>(
      `${this.baseUrl}/activateAccount?email=${email}`,
      null
    );
  }
}
