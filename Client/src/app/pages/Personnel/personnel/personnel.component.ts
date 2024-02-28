import { Component, OnInit } from "@angular/core";
import { response } from "express";
import { User } from "src/app/Model/User/user";
import { UserService } from "src/app/Service/UserService/user.service";

@Component({
  selector: "app-personnel",
  templateUrl: "./personnel.component.html",
  styleUrls: ["./personnel.component.scss"],
})
export class PersonnelComponent implements OnInit {
  constructor(private userService: UserService) {}

  public focus;
  pagination: number = 1;
  totalLength: any;
  searchValue = "";
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

  public searchUser() {
    if ((this.searchValue = "")) {
      this.ListUser();
    } else {
      this.ListUsers = this.ListUsers.filter((response) =>
        response.name.startsWith(this.searchValue)
      );
    }
  }
}
