import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Model/User/user";
import { RendezVous } from "src/app/Model/rendez-vous";
import { ServieType } from "src/app/Model/serviceType/servie-type";
import { ServiceTypeService } from "src/app/Service/ServiceTypeService/service-type.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { RendezVousService } from "src/app/Service/rendezVous/rendez-vous.service";
import { SocketService } from "src/app/socket/socket.service";

@Component({
  selector: "app-rendez-vous",
  templateUrl: "./rendez-vous.component.html",
  styleUrls: ["./rendez-vous.component.scss"],
})
export class RendezVousComponent implements OnInit {
  listeRendezVous: RendezVous[];
  newRendezVous: RendezVous = new RendezVous();

  UserQuery: User = new User();
  listEmploye: User[];
  employeSelected: User = new User();

  page = "liste_rendez_vous";

  serviceList: ServieType[];
  serviceSelected: ServieType = new ServieType();

  constructor(
    private rendezVousService: RendezVousService,
    private userService: UserService,
    private serviceTypeService: ServiceTypeService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.userService.GetUserByToken().subscribe((response: any) => {
      this.UserQuery = response.user;
      this.getAllRendezVous();
      this.getServices();
      this.getEmployee();
      this.AutoRefresh();
    });
  }

  getAllRendezVous() {
    this.rendezVousService
      .findByUser(this.UserQuery)
      .subscribe((response: any) => {
        console.log(response);
        this.listeRendezVous = response.rendezVous;
        console.log(this.listeRendezVous);
      });
  }

  getServices() {
    this.serviceTypeService.ListService().subscribe((response: any) => {
      this.serviceList = response.service;
      this.serviceSelected = this.serviceList[0];
      this.newRendezVous.serviceAsked = {
        idService: this.serviceSelected._id,
        nom: this.serviceSelected.nom,
        prix: this.serviceSelected.prix,
      };
    });
  }

  GetUser() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        this.UserQuery = response.user;
        console.log(this.UserQuery);
      });
    } catch (error) {
      console.error(error);
    }
  }

  public AutoRefresh() {
    try {
      this.socketService.on("ChangeState", (data) => {
        console.log("Web socket User updated event received:", data);
        this.getAllRendezVous();
      });
    } catch (error) {
      console.error(error);
    }
  }

  public ConfirmRdv(clientId: string, idEmp: string) {
    try {
      const state = true;
      this.rendezVousService
        .ChangeStateRdv(clientId, idEmp, state)
        .subscribe((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }
  public DeclinemRdv(clientId: string, idEmp: string) {
    try {
      const state = false;
      this.rendezVousService
        .ChangeStateRdv(clientId, idEmp, state)
        .subscribe((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }

  getEmployee() {
    this.userService.findByRole("employe").subscribe((response: any) => {
      this.listEmploye = response.Users;
      this.employeSelected = this.listEmploye[0];
      this.newRendezVous.employee = {
        idEmployee: this.employeSelected._id,
        nomEmployee: this.employeSelected.name,
      };
      this.newRendezVous.employee.idEmployee = this.employeSelected._id;
      this.newRendezVous.employee.nomEmployee = this.employeSelected.name;
    });
  }

  setServiceSelected() {
    this.newRendezVous.serviceAsked = {
      idService: this.serviceSelected._id,
      nom: this.serviceSelected.nom,
      prix: this.serviceSelected.prix,
    };
  }

  setEmployeSelected() {
    this.newRendezVous.employee = {
      idEmployee: this.employeSelected._id,
      nomEmployee: this.employeSelected.name,
    };
  }

  addEndTimeRDV(start: string): string {
    const dateDebut: Date = new Date(start);

    const date = dateDebut.getDate();
    const month = dateDebut.getMonth() + 1;
    const year = dateDebut.getFullYear();
    const hours = dateDebut.getHours();
    const minutes = dateDebut.getMinutes();

    const timeToAddInMinutes = this.serviceSelected.durre;
    const newMinutes = (minutes + timeToAddInMinutes) % 60;
    const newHours = Math.floor((minutes + timeToAddInMinutes) / 60);

    const newDate = new Date(
      year,
      month - 1,
      date,
      hours + newHours,
      newMinutes
    );

    return formatDate(
      newDate.getTime().toString(),
      "yyyy-MM-dd HH:mm",
      "en-US"
    );
  }

  createRDV() {
    this.newRendezVous.status = "en attente";
    this.newRendezVous.end = this.newRendezVous.start;
    this.newRendezVous.client = {
      idClient: this.UserQuery._id,
      nomClient: this.UserQuery.name,
    };
    this.newRendezVous.start = formatDate(
      new Date(this.newRendezVous.start).toString(),
      "yyyy-MM-dd HH:mm",
      "en-US"
    );
    this.newRendezVous.isConfirmed = false;
    this.newRendezVous.isDone = false;
    console.log(this.newRendezVous);
    this.rendezVousService
      .create(this.newRendezVous)
      .subscribe((response: any) => {
        this.page = "liste_rendez_vous";
        this.getAllRendezVous();
        this.newRendezVous = new RendezVous();
      });
  }

  updateRendezVous(rendezVous: RendezVous) {
    this.rendezVousService.update(rendezVous).subscribe((response: any) => {
      console.log(response);
    });
  }

  setRendezVousToAnnuler(rendezVous: RendezVous) {
    rendezVous.status = "annuler";
    this.updateRendezVous(rendezVous);
  }

  toggleWithGreeting(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
