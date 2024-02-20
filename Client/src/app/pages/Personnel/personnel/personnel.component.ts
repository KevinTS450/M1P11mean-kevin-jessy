import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Model/User/user";
import { UserService } from "src/app/Service/UserService/user.service";

@Component({
  selector: "app-personnel",
  templateUrl: "./personnel.component.html",
  styleUrls: ["./personnel.component.scss"],
})
export class PersonnelComponent implements OnInit {
  constructor(private userService: UserService) {}
  UserQuery: User = new User();
  ListUsers: User[];
  ngOnInit(): void {
    this.GetUser();
    this.ListUser();
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

  public ListUser() {
    try {
      this.userService.ListUser().subscribe((response: any) => {
        console.log(response);
        this.ListUsers = response.AllUser;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
