import { Component, OnInit } from "@angular/core";
import { response } from "express";
import { Notification } from "src/app/Model/Notification/notification";
import { User } from "src/app/Model/User/user";
import { NotificationService } from "src/app/Service/notificationService/notification.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { SocketService } from "src/app/socket/socket.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.GetUser();
    this.AutoRefresh();
  }
  pagination: number = 1;
  totalLength: any;

  id_user: string;
  initial_start_time: string;
  initial_id_emp: string;
  email: string;
  loading: boolean = false;
  initialid: string;
  initialName: string;
  initialLastName: string;
  UserQuery: User = new User();
  Notif: Notification[];

  public GetUser() {
    try {
      this.loading = true;
      setTimeout(() => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 3000);

        this.userService.GetUserByToken().subscribe((response: any) => {
          this.UserQuery = response.user;
          this.initialid = this.UserQuery._id;
          this.initialName = this.UserQuery.name;
          this.initialLastName = this.UserQuery.last_name;
          this.id_user = response.user._id;
          this.email = response.user.email;
          this.getNotification(this.initialid);
        });
        clearTimeout(loadingTimeout);
        this.loading = false;
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }
  public getNotification(destinataire: string) {
    try {
      this.notificationService
        .getNotificationById(destinataire)
        .subscribe((response: any) => {
          this.Notif = response.notif;
        });
    } catch (error) {
      console.error(error);
    }
  }

  public updateLecture(destinataire: string) {
    try {
      this.notificationService
        .UpdateLectureNotif(destinataire)
        .subscribe((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }

  public AutoRefresh() {
    try {
      this.socketService.on("read", (data) => {
        console.log("Web socket User updated event received:", data);
        console.log(data);
        this.GetUser();
      });
    } catch (error) {
      console.error(error);
    }
  }
}
