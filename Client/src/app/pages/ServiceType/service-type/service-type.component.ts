import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import Sortable from "sortablejs";
import { CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";

import { User } from "src/app/Model/User/user";
import { ServiceTypeService } from "src/app/Service/ServiceTypeService/service-type.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { ServieType } from "src/app/Model/serviceType/servie-type";
import { Router } from "@angular/router";
import { Preference } from "src/app/Model/Preference/preference";
import { PreferenceService } from "src/app/Service/preferenceService/preference.service";
import { SocketService } from "src/app/socket/socket.service";
@Component({
  selector: "app-service-type",
  templateUrl: "./service-type.component.html",
  styleUrls: ["./service-type.component.scss"],
})
export class ServiceTypeComponent implements OnInit, AfterViewInit {
  @ViewChild("cardWrapper") cardWrapper!: ElementRef;
  @ViewChild("deleteIconWrapper") deleteIconWrapper!: ElementRef;

  ngAfterViewInit() {
    Sortable.create(this.cardWrapper.nativeElement, {
      animation: 150,
      onStart: () => {
        this.isDragging = true;
      },
      onEnd: () => {
        this.isDragging = false;
      },
    });
  }
  constructor(
    private userService: UserService,
    private serviceTypeService: ServiceTypeService,
    private router: Router,
    private preferenceService: PreferenceService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getService();
    this.AutoRefreh();
  }
  id_user: string;
  pref_exist: boolean = false;
  pref_added: boolean = false;
  userProfile: User = new User();
  service: ServieType[];
  isDragging: boolean = false;
  serviceDeleted: boolean = false;
  notif: number;
  public ToUpdate(id: string) {
    return this.router.navigate(["ModifierService", id]);
  }

  public toAddService() {
    try {
      return this.router.navigate(["AjoutService"]);
    } catch (error) {
      console.error(error);
    }
  }

  public RemoveService(id: string) {
    try {
      this.serviceTypeService.DeleteService(id).subscribe((response) => {
        console.log(response);
        this.serviceDeleted = true;
      });
    } catch (error) {
      console.error(error);
    }
  }

  public getUser() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        console.log(response);
        this.userProfile = response.user;
        this.id_user = response.user._id;
        this.countNotif();
      });
    } catch (error) {
      console.error(error);
    }
  }

  public countNotif() {
    try {
      const type = "service";
      console.log(this.id_user);
      this.preferenceService
        .GetCountPreference(type, this.id_user)
        .subscribe((response: any) => {
          this.notif = response.count;
        });
    } catch (error) {
      console.error(error);
    }
  }

  public AutoRefreh() {
    try {
      this.socketService.on("serviceDeleted", (data) => {
        console.log("Web socket servicer deleted event received:", data);

        this.getService();
      });
      this.socketService.on("countFavService", (data) => {
        console.log("Web socket Notif updated event received:", data);
        this.getUser();
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async AddServiceToFavorite(
    id: string,
    nom: string,
    prix: string,
    commission: string
  ) {
    try {
      const clientData: {} = {
        idClient: this.id_user,
        nomClient: this.userProfile.name,
      };
      const serviceData: any = {
        idServ: id,
        nomServ: nom,
        prixServ: prix,
        commSer: commission,
      };
      const empData: {} = {
        idEmploye: "not specified",
        nomEmploye: "not specified",
      };

      const preference: Preference = {
        employe: empData,
        client: clientData,
        service: serviceData,
        type: "service",
        idEmp: this.id_user,
      };
      const isPrefExist = await this.checkPreferenceExist(
        preference.type,
        this.id_user,
        id
      );
      console.log(isPrefExist);
      if (isPrefExist) {
        this.pref_exist = true;
      } else {
        this.preferenceService
          .AddPreference(preference)
          .subscribe((response) => {
            console.log(response);
            this.pref_added = true;
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  public getService() {
    try {
      this.serviceTypeService.ListService().subscribe((response: any) => {
        console.log(response);
        this.service = response.service;
      });
    } catch (error) {
      console.error(error);
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
  onDeleteIconDrop(event: CdkDragDrop<any[]>) {
    const droppedItem = event.item.data;
    const dropList = event.container.data;
    console.log("ato le izy ");

    if (this.isPointerOverContainer(event, this.deleteIconWrapper)) {
      const serviceId = droppedItem.context.service_query._id;
      this.RemoveService(serviceId);
    }
  }

  private isPointerOverContainer(
    event: CdkDragDrop<any>,
    container: ElementRef
  ) {
    const pointerPosition = event.distance;
    const { top, left, bottom, right } =
      container.nativeElement.getBoundingClientRect();
    return (
      pointerPosition.x >= left &&
      pointerPosition.x <= right &&
      pointerPosition.y >= top &&
      pointerPosition.y <= bottom
    );
  }
}
