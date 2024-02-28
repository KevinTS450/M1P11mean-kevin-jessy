import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/Model/User/user";
import { SessionService } from "src/app/pages/session/session.service";
import { AuthService } from "src/app/Service/AuthService/auth.service";
import { NotificationService } from "src/app/Service/notificationService/notification.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { SocketService } from "src/app/socket/socket.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  hidden?: (userProfile: User) => boolean; // Define hidden property as optional function
}

export const ROUTES: RouteInfo[] = [
  // {
  //   path: "/user-profile",
  //   title: "User profile",
  //   icon: "ni-single-02 text-yellow",
  //   class: "",
  // },
  {
    path: "/login",
    title: "Login",
    icon: "ni-key-25 text-info",
    class: "",
    hidden: userProfileExists,
  },
  {
    path: "/register",
    title: "Register",
    icon: "ni-circle-08 text-pink",
    class: "",
    hidden: userProfileExists,
  },
  {
    path: "/serviceType",
    title: "service",
    icon: "ni-book-bookmark text-red",
    class: "",
    hidden: userProfileManger,
  },
  // {
  //   path: "/priseRendezVous",
  //   title: "rendez vous",
  //   icon: "ni-single-copy-04 text-red",
  //   class: "",
  //   hidden: userProfileClient,
  // },
  // {
  //   path: "/ajoutMobileMoney",
  //   title: "Mobile money",
  //   icon: "ni-money-coins text-green",
  //   class: "",
  //   hidden: userProfileClient,
  // },
  {
    path: "/personnel",
    title: "Personnel",
    icon: "ni-badge text-green",
    class: "",
    hidden: userProfileManger,
  },

  {
    path: "/tache",
    title: "Tache",
    icon: "ni-badge text-green",
    class: "",
    hidden: userProfileEmp,
  },
  {
    path: "/paiements",
    title: "Paiement",
    icon: "ni-money-coins text-green",
    class: "",
    hidden: userProfileManger,
  },
  {
    path: "/Listemploye",
    title: "Employe",
    icon: "ni-badge text-green",
    class: "",
    hidden: userProfileClient,
  },
  {
    path: "/RendezVous",
    title: "RendezVous",
    icon: "ni-watch-time text-blue",
    class: "",
  },
  {
    path: "/Solde",
    title: "Solde",
    icon: "ni-money-coins text-blue",
    class: "",
  },
  {
    path: "/notification",
    title: "Notification",
    icon: "ni-bell-55 text-blue",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public UserProfile: User = new User();
  public countNotif: number;
  loading: boolean = false;
  constructor(
    private router: Router,
    private user: UserService,
    private notificationService: NotificationService,
    private socketService: SocketService,
    private auhtService: AuthService,
    private session: SessionService,
    private route: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.getUser();
    this.AutoRefresh();
  }
  getNotificationCount(destinataire: string) {
    this.notificationService
      .GetCountNotif(destinataire)
      .subscribe((response: any) => {
        this.countNotif = response.count;
      });
  }

  public getUser() {
    try {
      this.user.GetUserByToken().subscribe((response: any) => {
        this.UserProfile = response.user;
        // console.log(this.UserProfile);
        this.updateMenuItems();
        this.getNotificationCount(response.user._id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  public deconnecteUser() {
    try {
      this.loading = true;
      setTimeout(() => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 2500);
        console.log("ato");
        this.auhtService.Logout().subscribe((response) => {
          console.log(response);
          clearTimeout(loadingTimeout);
          this.loading = false;
          this.session.removeToken();
          localStorage.removeItem("exp");

          this.route.navigate(["login"]);
        });
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  }

  public AutoRefresh() {
    try {
      this.refreshNotif();
    } catch (error) {
      console.error(error);
    }
  }

  public refreshNotif() {
    try {
      this.socketService.on("countNotif", (data) => {
        console.log("Web socket User updated event received:", data);
        console.log(data);
        this.getUser();
        this.countNotif = data.count;
      });
    } catch (error) {
      console.error(error);
    }
  }

  private updateMenuItems() {
    this.menuItems = ROUTES.filter((menuItem) => {
      return menuItem.hidden ? menuItem.hidden(this.UserProfile) : true;
    });
  }
}

function userProfileExists() {
  return !!this.UserProfile;
}
function userProfileEmp(userProfile: User): boolean {
  return userProfile.role === "employe";
}
function userProfileManger(userProfile: User): boolean {
  return userProfile.role === "manager";
}
function userProfileClient(userProfile: User): boolean {
  return userProfile.role === "client";
}
function userProfileClientEmp(userProfile: User): boolean {
  return userProfile.role === "client" || userProfile.role === "employe";
}
