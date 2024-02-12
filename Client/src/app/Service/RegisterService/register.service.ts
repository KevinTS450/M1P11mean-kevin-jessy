import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private baseUrl = "http://localhost:5000/api/user";

  constructor(private http: HttpClient) {}

  public Inscription(data: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/inscription`, data);
  }
}
