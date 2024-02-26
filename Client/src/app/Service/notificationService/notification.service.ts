import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/Model/Notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}
  private baseUrl = "http://localhost:5000/api/notification";

  public createNotification(data: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/create`, data);
  }

  public updateNotification(Notification:Notification): Observable<any>{
    return this.http.put(`${this.baseUrl}`+`/updateById`+`/${Notification._id}`, Notification);
  }

  public getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/findAll`);
  }

  public getNotificationById(paiement:Notification): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/findById`+`/${paiement._id}`);
  }
}
