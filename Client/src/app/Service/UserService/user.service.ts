import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionService } from "src/app/pages/session/session.service";
import { User } from "src/app/Model/User/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = "http://localhost:5000/api/user";

  constructor(private http: HttpClient, private session: SessionService) {}

  public GetUserByToken(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: ` ${this.session.getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    return this.http.get<User>(`${this.baseUrl}/get-user`, {
      headers: headers,
    });
  }

  public UpdateProfile(data: User): Observable<string[]> {
    return this.http.put<string[]>(`${this.baseUrl}/update`, data);
  }

  public UpdateProfile(data: User, email: string): Observable<string[]> {
    return this.http.put<string[]>(
      `${this.baseUrl}/update?email=${email}`,
      data
    );
  }

  public ListUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/AllUser`);
  }

  public findByRole(role:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`+`/findByRole`+`/${role}`);
  }
}
