import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ServieType } from "src/app/Model/serviceType/servie-type";
import { User } from "src/app/Model/User/user";
import { ServiceTypeService } from "src/app/Service/ServiceTypeService/service-type.service";
import { UploadService } from "src/app/Service/UploadService/upload.service";
import { UserService } from "src/app/Service/UserService/user.service";

@Component({
  selector: "app-modifier-service",
  templateUrl: "./modifier-service.component.html",
  styleUrls: ["./modifier-service.component.scss"],
})
export class ModifierServiceComponent implements OnInit {
  constructor(
    private userService: UserService,
    private serviceTypeService: ServiceTypeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private upload: UploadService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    try {
      this.getUser();
      this.ServiceFormDisplay();
      this.GetServiceBId();
    } catch (error) {
      console.error(error);
    }
  }

  userProfile: User = new User();
  ServiceForm: FormGroup;
  serviceCreated: boolean = false;
  file_query: File;
  ServiceSeleted: ServieType = new ServieType();
  id: string;
  initialNom: string;
  initialPrix: number;
  initialDurre: string;
  initialCommission: number;
  initialImage: string;

  serviceUpdated: boolean = false;

  public toListService() {
    try {
      return this.router.navigate(["serviceType"]);
    } catch (error) {
      console.error(error);
    }
  }
  public updateService(ServiceForm: FormGroup) {
    const result = ServiceForm.value;
    const newNom = result.nom;
    const newPrix = result.prix;
    const newDurre = result.durre;
    const newCom = result.commission;

    if (
      newNom !== this.initialNom ||
      newPrix !== this.initialPrix ||
      newDurre !== this.initialDurre ||
      newCom !== this.initialCommission
    ) {
      const newService: ServieType = {
        nom: newNom !== "" ? newNom : this.initialNom,
        prix: newPrix !== "" ? newPrix : this.initialPrix,
        durre: newDurre !== "" ? newDurre : this.initialDurre,
        commission: newCom !== "" ? newCom : this.initialCommission,
        image: "",
      };
      ServiceForm.patchValue(newService);

      if (this.file_query) {
        this.upload.UploadImg(this.file_query).subscribe((uploadResponse) => {
          console.log(uploadResponse);
          newService.image = this.file_query.name;
          console.log(newService.image);
          this.serviceTypeService
            .UpdateService(newService)
            .subscribe((response: any) => {
              console.log(response);
              this.serviceUpdated = true;
            });
        });
      } else {
        this.serviceTypeService
          .UpdateService(newService)
          .subscribe((response: any) => {
            console.log(response);
            this.serviceUpdated = true;
          });
      }
    } else {
      console.log("Nothing to update");
    }
  }

  public GetServiceBId() {
    try {
      this.id = this.activateRoute.snapshot.params["id"];
      this.serviceTypeService
        .GetServiceById(this.id)
        .subscribe((response: any) => {
          console.log(response);
          this.ServiceSeleted = response.service;
          this.initialNom = this.ServiceSeleted.nom;
          this.initialPrix = this.ServiceSeleted.prix;
          this.initialDurre = this.ServiceSeleted.durre;
          this.initialCommission = this.ServiceSeleted.commission;
          this.initialImage = this.ServiceSeleted.image;
        });
    } catch (error) {
      console.error(error);
    }
  }
  public onFileSelected(event) {
    const file: File = event.target.files[0];

    this.file_query = file;
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
        nom: [""],
        prix: [""],
        durre: [""],
        commission: [""],
        image: [""],
      });
    } catch (error) {
      console.error(error);
    }
  }
}
