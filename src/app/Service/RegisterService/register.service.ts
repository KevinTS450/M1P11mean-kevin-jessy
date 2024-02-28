import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private baseUrl = "https://m1p11mean-kevin-jessy-1.onrender.com/api/user";

  constructor(private http: HttpClient) {}

  public Inscription(data: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/inscription`, data);
  }
}
