import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  public Auth(data: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/login`, data);
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
