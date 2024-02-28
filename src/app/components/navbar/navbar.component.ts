import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from "src/app/Service/UserService/user.service";
import { User } from "src/app/Model/User/user";
import { AuthService } from "src/app/Service/AuthService/auth.service";
import { SessionService } from "src/app/pages/session/session.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  userProfile: User = new User();

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private userService: UserService,
    private AuthService: AuthService,
    private session: SessionService,
    private route: Router
  ) {
    this.location = location;
  }

  public GetUserProfile() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        console.log(response);
        this.userProfile = response.user;
      });
    } catch (error) {
      console.error(error);
    }
  }

  public deconnecteUser() {
    try {
      console.log("ato");
      this.AuthService.Logout().subscribe((response) => {
        console.log(response);
        this.session.removeToken();
        this.route.navigate(["login"]);
      });
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.GetUserProfile();
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
}
