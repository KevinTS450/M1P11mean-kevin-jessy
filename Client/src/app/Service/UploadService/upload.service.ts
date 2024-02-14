import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  private baseUrl = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  public UploadImg(image: File): Observable<any> {
    const formData = new FormData();
    formData.append("image", image);

    return this.http.post<any>(`${this.baseUrl}/upload`, formData);
  }
  public GetPath(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}` + `/path`);
  }
}
