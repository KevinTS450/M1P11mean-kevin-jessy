import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Preference } from "src/app/Model/Preference/preference";

@Injectable({
  providedIn: "root",
})
export class PreferenceService {
  constructor(private http: HttpClient) {}

  private baseUrl =
    "https://m1p11mean-kevin-jessy-1.onrender.com/api/preference";

  public AddPreference(data: Preference): Observable<Preference> {
    return this.http.post<Preference>(`${this.baseUrl}/add`, data);
  }
  public GetCountPreference(
    type: string,
    idClient: string
  ): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/count?type=${type}&clientId=${idClient}`
    );
  }

  public CheckIfItExist(
    type: string,
    clientId: string,
    serviceId: string
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/checkIfItExist?type=${type}&clientId=${clientId}&idService=${serviceId}`
    );
  }

  public GetPreference(
    type: string,
    clientId: string
  ): Observable<Preference[]> {
    return this.http.get<Preference[]>(
      `${this.baseUrl}/getPreference?type=${type}&clientId=${clientId}`
    );
  }

  public RemovePreference(
    type: string,
    clientId: string
  ): Observable<Preference> {
    return this.http.delete<Preference>(
      `${this.baseUrl}/remove?type=${type}&clientId=${clientId}`
    );
  }
}
