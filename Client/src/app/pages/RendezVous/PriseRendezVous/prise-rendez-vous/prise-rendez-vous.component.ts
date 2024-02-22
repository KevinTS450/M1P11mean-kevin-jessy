import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Model/User/user";
import { UserService } from "src/app/Service/UserService/user.service";

@Component({
  selector: "app-prise-rendez-vous",
  templateUrl: "./prise-rendez-vous.component.html",
  styleUrls: ["./prise-rendez-vous.component.scss"],
})
export class PriseRendezVousComponent implements OnInit {
  constructor(private userService: UserService) {}
  userProfile: User = new User();
  ngOnInit(): void {
    this.getUser();
  }

  public getUser() {
    try {
      this.userService.GetUserByToken().subscribe((response) => {
        console.log(response);
        this.userProfile = response;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
