import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Model/User/user";
import { UserService } from "src/app/Service/UserService/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService) {}
  UserQuery: User = new User();
  ngOnInit() {
    this.GetUser();
  }

  public GetUser() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        this.UserQuery = response.user;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
