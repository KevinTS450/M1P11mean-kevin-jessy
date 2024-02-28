import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServieType } from "src/app/Model/serviceType/servie-type";
import { User } from "src/app/Model/User/user";
import { ServiceTypeService } from "src/app/Service/ServiceTypeService/service-type.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { Notification } from "src/app/Model/Notification/notification";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";
import { UploadService } from "src/app/Service/UploadService/upload.service";
import { response } from "express";
import { NotificationService } from "src/app/Service/notificationService/notification.service";
@Component({
  selector: "app-ajouter-service",
  templateUrl: "./ajouter-service.component.html",
  styleUrls: ["./ajouter-service.component.scss"],
})
export class AjouterServiceComponent implements OnInit {
  constructor(
    private userService: UserService,
    private serviceTypeService: ServiceTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private upload: UploadService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    try {
      this.getUser();
      this.getService();
      this.ServiceFormDisplay();
    } catch (error) {
      console.error(error);
    }
  }

  userProfile: User = new User();
  service: ServieType[];
  ServiceForm: FormGroup;
  serviceCreated: boolean = false;
  file_query: File;
  loading: boolean = false;

  public toListService() {
    try {
      return this.router.navigate(["serviceType"]);
    } catch (error) {
      console.error(error);
    }
  }
  public onFileSelected(event) {
    const file: File = event.target.files[0];

    this.file_query = file;
  }

  public AddServie(ServiceForm: FormGroup) {
    try {
      if (ServiceForm.valid) {
        this.loading = true;
        setTimeout(() => {
          const loadingTimeout = setTimeout(() => {
            this.loading = false;
          }, 30000);
          this.loading = true;

          const result = ServiceForm.value;
          this.upload.UploadImg(this.file_query).subscribe((responseFile) => {
            console.log(responseFile);
            result.image = this.file_query.name;
            this.serviceTypeService
              .CreateService(result)
              .subscribe((response: any) => {
                console.log(response);
                clearTimeout(loadingTimeout);
                this.loading = false;
                this.serviceCreated = true;
                setTimeout(() => {
                  this.serviceCreated = false;
                }, 3000);
                this.ServiceForm.reset();
                this.userService
                  .GetUserByToken()
                  .subscribe((responseUser: any) => {
                    console.log(responseUser);
                    const notification = "service";
                    const remarque = "a ajouter un nouveau service :";
                    const idServ = response.status.insertedId;
                    const nomServ = response.result.nom;
                    const prixServ = result.prix;

                    this.createNotification(
                      notification,
                      remarque,
                      idServ,
                      nomServ,
                      prixServ,
                      responseUser.user._id,
                      responseUser.user.name,
                      responseUser.user.image
                    );
                  });
              });
          });
        }, 3000);
      } else {
        ServiceForm.markAllAsTouched();
      }
    } catch (error) {
      console.error(error);
    }
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

  public ServiceFormDisplay() {
    try {
      this.ServiceForm = this.formBuilder.group({
        nom: ["", Validators.required],
        prix: ["", Validators.required],
        durre: ["", Validators.required],
        commission: ["", Validators.required],
        image: ["", Validators.required],
      });
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

  public createNotification(
    notification: string,
    remarque: string,
    idServ: string,
    nomServ: string,
    prixServ: string,
    idEnvoyeur: string,
    nomEnvoyeur: string,
    imageEnv: string
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
    notification_query.destinataire = "client";

    notification_query.envoyeur.idEnv = idEnvoyeur;
    notification_query.envoyeur.nomEnv = nomEnvoyeur;
    notification_query.envoyeur.imageEnv = imageEnv;

    this.notificationService
      .createNotification(notification_query)
      .subscribe((response) => {
        return response;
      });
  }
}
