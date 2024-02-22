import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Preference } from "src/app/Model/Preference/preference";

@Injectable({
  providedIn: "root",
})
export class PreferenceService {
  constructor(private http: HttpClient) {}

  private baseUrl = "http://localhost:5000/api/preference";

  public AddPreference(data: Preference): Observable<Preference> {
    return this.http.post<Preference>(`${this.baseUrl}/add`, data);
  }
}
