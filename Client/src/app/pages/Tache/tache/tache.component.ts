import { Component, OnInit } from "@angular/core";
import { RendezVous } from "src/app/Model/rendezVous/rendez-vous";
import { User } from "src/app/Model/User/user";
import { RendezVousService } from "src/app/Service/rendezVous/rendez-vous.service";
import { UserService } from "src/app/Service/UserService/user.service";

@Component({
  selector: "app-tache",
  templateUrl: "./tache.component.html",
  styleUrls: ["./tache.component.scss"],
})
export class TacheComponent implements OnInit {
  constructor(
    private userService: UserService,
    private rendezVousService: RendezVousService
  ) {}
  loading: boolean = false;
  UserQuery: User = new User();
  initialid: string;
  initialName: string;
  initialLastName: string;
  email: string;
  id_user: string;
  tache: RendezVous[];
  ngOnInit(): void {
    this.GetUser();
  }

  public GetUser() {
    try {
      this.loading = true;
      setTimeout(() => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 30000);

        this.userService.GetUserByToken().subscribe((response: any) => {
          this.UserQuery = response.user;
          this.initialid = this.UserQuery._id;
          this.initialName = this.UserQuery.name;
          this.initialLastName = this.UserQuery.last_name;
          this.id_user = response.user._id;
          this.email = response.user.email;
          this.GetRdvConfirmerd();
        });
        clearTimeout(loadingTimeout);
        this.loading = false;
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  public GetRdvConfirmerd() {
    try {
      this.rendezVousService
        .findByUserConfirmed(this.UserQuery)
        .subscribe((response: any) => {
          console.log(response);
          this.tache = response.rendezVous;
        });
    } catch (error) {
      console.error(error);
    }
  }
}