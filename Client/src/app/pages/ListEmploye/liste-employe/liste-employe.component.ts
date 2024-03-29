import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { response } from "express";
import { Preference } from "src/app/Model/Preference/preference";
import { User } from "src/app/Model/User/user";
import { PreferenceService } from "src/app/Service/preferenceService/preference.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { SocketService } from "src/app/socket/socket.service";

@Component({
  selector: "app-liste-employe",
  templateUrl: "./liste-employe.component.html",
  styleUrls: ["./liste-employe.component.scss"],
})
export class ListeEmployeComponent implements OnInit {

  searchValue_preference: string;
  List_preference_queryLength: number;
  constructor(
    private userService: UserService,
    private preferenceService: PreferenceService,
    private socketService: SocketService
  ) {}
  UserQuery: User = new User();
  public focus;
  employe: User[];
  employeFiltered:User[];
  loading: boolean = false;
  count: number;
  list_emp: boolean = true;
  list_preference: boolean = false;
  List_preference_query: Preference[];
  List_preference_queryFiltered: Preference[];
  searchValue:string;
  isUsed = 0;

  preference_add: boolean = false;
  preference_remove: boolean = false;
  pagination: number = 1;
  totalLength: any;
  ngOnInit(): void {
    this.GetUser();
    this.getUserByRole();

    this.AutoRefresh();
  }

  public removePreference(clientId: string) {
    try {
      this.loading = true;
      this.GetPreference(this.UserQuery._id);
      setTimeout(async () => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 3000);

        const type = "employe";
        this.preferenceService
          .RemovePreference(type, clientId)
          .subscribe((response) => {
            console.log(response);
            clearTimeout(loadingTimeout);
            this.loading = false;
            this.preference_remove = true;
            setTimeout(() => {
              this.preference_remove = false;
            }, 3000);
            this.ngOnInit();
          });
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  public GetUser() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        this.UserQuery = response.user;

        this.getCountPreference();
        this.GetPreference(response.user._id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  public AutoRefresh() {
    try {
      this.countFavRefreshPage();
      this.removeFavRefreshPage();
    } catch (error) {
      console.error(error);
    }
  }

  public getCountPreference() {
    try {
      this.preferenceService
        .GetCountPreference("employe", this.UserQuery._id)
        .subscribe((response: any) => {
          console.log(response);
          this.count = response.count;
        });
    } catch (error) {
      console.error(error);
    }
  }
  public countFavRefreshPage() {
    try {
      this.socketService.on("countFavService", (data) => {
        console.log("Web socket Notif updated event received:", data);
        this.GetUser();
      });
    } catch (error) {
      console.error(error);
    }
  }
  public removeFavRefreshPage() {
    try {
      this.socketService.on("removeFav", (data) => {
        console.log("Web socket Notif removed event received:", data);
        this.GetUser();
      });
    } catch (error) {
      console.error(error);
    }
  }

  public getUserByRole() {
    try {
      console.log("ato");
      this.loading = true;
      setTimeout(() => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 3000);
        this.userService.findByRole("employe").subscribe((response: any) => {
          console.log(response);
          this.employe = response.Users;
          this.employeFiltered = response.Users;
          clearTimeout(loadingTimeout);
          this.loading = false;
        });
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  public changeStatePreference() {
    try {
      this.loading = true;

      setTimeout(async () => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 3000);
        clearTimeout(loadingTimeout);
        this.loading = false;
        this.list_emp = false;
        this.list_preference = true;
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  public async AddToPreference(
    id: string,
    name: string,
    prenom: string,
    image: string,
    email: string
  ) {
    try {
      this.loading = true;
      this.GetPreference(this.UserQuery._id);
      setTimeout(async () => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 3000);
        const clientData: {} = {
          idClient: this.UserQuery._id,
          nomClient: this.UserQuery.name,
        };
        const serviceData: any = {
          idServ: "not specified",
          nomServ: "not specified",
          prixServ: "not specified",
          commSer: "not specified",
          durreServ: "not specified",
          imageServ: "not specified",
        };
        const empData: any = {
          idEmploye: id,
          nomEmploye: name,
          prenomEmploye: prenom,
          imageEmploye: image,
          emailEmploye: email,
        };

        const preference: Preference = {
          employe: empData,
          client: clientData,
          service: serviceData,
          type: "employe",
          idEmp: this.UserQuery._id,
        };
        const isPrefExist = await this.checkPreferenceExist(
          preference.type,
          this.UserQuery._id,
          id
        );
        if (isPrefExist) {
          console.log("efa misy");
        } else {
          this.preferenceService
            .AddPreference(preference)
            .subscribe((response) => {
              console.log(response);
              clearTimeout(loadingTimeout);
              this.loading = false;
              this.preference_add = true;
              setTimeout(() => {
                this.preference_add = false;
              }, 3000);
              this.ngOnInit();
            });
        }
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }
  public changeStatePreferenceEmploye() {
    try {
      this.loading = true;

      setTimeout(async () => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 3000);
        clearTimeout(loadingTimeout);
        this.loading = false;
        this.list_preference = false;

        this.list_emp = true;
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  public GetPreference(clientId: string) {
    try {
      const type = "employe";
      this.preferenceService
        .GetPreference(type, clientId)
        .subscribe((response: any) => {
          console.log(response);
          this.List_preference_query = response.preference;
          this.List_preference_queryLength = this.List_preference_query.length;
          this.List_preference_queryFiltered = this.List_preference_query;
          console.log(this.List_preference_query);
        });
    } catch (error) {
      console.error(error);
    }
  }
  
  public isServiceAddedToFavorites(empId: string): boolean {
    if (this.List_preference_query && this.List_preference_query.length > 0) {
      return this.List_preference_query.some(
        (preference: Preference) =>
          preference.employe && preference.employe.idEmploye === empId
      );
    } else {
      return false;
    }
  }
  public async checkPreferenceExist(
    type: string,
    clientId: string,
    serviceId: string
  ): Promise<boolean> {
    try {
      const response: any = await this.preferenceService
        .CheckIfItExist(type, clientId, serviceId)
        .toPromise();
      return response.exists === true ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  searchEmploye() {
    console.log(this.searchValue);
    this.employeFiltered = this.employe;
    this.employeFiltered = this.employeFiltered.filter(resp => resp.name.startsWith(this.searchValue));
  }

  searchEmploye_pref() {
    console.log(this.searchValue_preference)
    this.List_preference_queryFiltered = this.List_preference_query;
    this.List_preference_queryFiltered = this.List_preference_queryFiltered.filter(resp => resp.employe.nomEmploye.startsWith(this.searchValue_preference));
  }

  dropEmploye(event: CdkDragDrop<User[]>) {
    console.log(event.item.data);
    const userDragged:User = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(this.employe, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.AddToPreference(userDragged._id,userDragged.name,userDragged.last_name,userDragged.image,userDragged.email);
    }
  }

  dropPreference(event: CdkDragDrop<Preference[]>) {
    console.log(event.item.data);
    const preferenceDragged:Preference = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(this.List_preference_query, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.removePreference(this.UserQuery._id)
    }
  }

}
