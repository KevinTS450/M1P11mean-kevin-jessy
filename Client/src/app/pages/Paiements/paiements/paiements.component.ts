import { Component, OnInit } from "@angular/core";
import { response } from "express";
import { Paiement } from "src/app/Model/paiement/paiement";
import { User } from "src/app/Model/User/user";
import { PaiementService } from "src/app/Service/paiement/paiement.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { SocketService } from "src/app/socket/socket.service";
import { Notification } from "src/app/Model/Notification/notification";
import { NotificationService } from "src/app/Service/notificationService/notification.service";

@Component({
  selector: "app-paiements",
  templateUrl: "./paiements.component.html",
  styleUrls: ["./paiements.component.scss"],
})
export class PaiementsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private paiementService: PaiementService,
    private socketService: SocketService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.GetUser();
    this.AutoRefresh();
  }
  Paiement: Paiement[];
  id_user: string;
  initial_start_time: string;
  initial_id_emp: string;
  email: string;
  initial_image: string;
  loading: boolean = false;
  initialid: string;
  initialName: string;
  initialLastName: string;
  UserQuery: User = new User();

  public GetUser() {
    try {
      this.loading = true;
      setTimeout(() => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 3000);

        this.userService.GetUserByToken().subscribe((response: any) => {
          this.UserQuery = response.user;
          this.initialid = this.UserQuery._id;
          this.initialName = this.UserQuery.name;
          this.initialLastName = this.UserQuery.last_name;
          this.id_user = response.user._id;
          this.email = response.user.email;
          this.initial_image = response.user.image;
          this.getAllPaiements();
        });
        clearTimeout(loadingTimeout);
        this.loading = false;
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  public AutoRefresh() {
    try {
      this.socketService.on("versed", (data) => {
        console.log("Web socket User updated event received:", data);
        console.log(data);
        this.GetUser();
      });
    } catch (error) {
      console.error(error);
    }
  }

  public createNotification(
    notification: string,
    remarque: string,
    idServ: string,
    nomServ: string,
    prixServ: string,
    idEnvoyeur: string,
    nomEnvoyeur: string,
    imageEnv: string,
    destinataire: string
  ) {
    const date = new Date().toLocaleString();
    const notification_query = new Notification();
    notification_query.notification = notification;
    notification_query.remarque = remarque;
    notification_query.date = date;
    notification_query.isRead = false;

    notification_query.serviceConcerne = {
      idServ: "",
      nomServ: "",
      prixServ: "",
    };
    notification_query.envoyeur = { idEnv: "", nomEnv: "", imageEnv: "" };

    notification_query.serviceConcerne.idServ = idServ;
    notification_query.serviceConcerne.nomServ = nomServ;
    notification_query.serviceConcerne.prixServ = prixServ;
    notification_query.destinataire = destinataire;

    notification_query.envoyeur.idEnv = idEnvoyeur;
    notification_query.envoyeur.nomEnv = nomEnvoyeur;
    notification_query.envoyeur.imageEnv = imageEnv;

    this.notificationService
      .createNotification(notification_query)
      .subscribe((response) => {
        return response;
      });
  }

  public getAllPaiements() {
    try {
      this.paiementService.getAllPaiements().subscribe((response: any) => {
        console.log(response.AllPaiements);
        this.Paiement = response.AllPaiements;
        console.log(this.Paiement);
      });
    } catch (error) {
      console.error(error);
    }
  }

  public versement(idEmp: string, montant: number, commission: number) {
    try {
      const montantTotal = montant / commission;
      this.paiementService
        .versementEmployer(idEmp, montantTotal)
        .subscribe((response) => {
          console.log(response);
          const notification = "paiements";
          const remarque =
            "a verser " +
            montantTotal +
            " Ar sur votre compte sur le montant total de  :   " +
            montant +
            " avec une commission de :" +
            commission +
            "%";
          const idServ = "not specified";
          const nomServ = "not specified";
          const prixSer = "not specified";
          const idEnvoyeur = this.initialid;
          const nomEnvoyeur = this.initialName;
          const imageEnv = this.initial_image;
          this.createNotification(
            notification,
            remarque,
            idServ,
            nomServ,
            prixSer,
            idEnvoyeur,
            nomEnvoyeur,
            imageEnv,
            idEmp
          );
        });
    } catch (error) {
      console.error(error);
    }
  }
}
