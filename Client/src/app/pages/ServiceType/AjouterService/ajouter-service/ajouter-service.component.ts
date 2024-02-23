import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServieType } from "src/app/Model/serviceType/servie-type";
import { User } from "src/app/Model/User/user";
import { ServiceTypeService } from "src/app/Service/ServiceTypeService/service-type.service";
import { UserService } from "src/app/Service/UserService/user.service";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";
import { UploadService } from "src/app/Service/UploadService/upload.service";
import { response } from "express";
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
    private upload: UploadService
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

  public AddServie(ServiceForm) {
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
              .subscribe((response) => {
                console.log(response);
                clearTimeout(loadingTimeout);
                this.loading = false;
                this.serviceCreated = true;
                setTimeout(() => {
                  this.serviceCreated = false;
                }, 4000);
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
}
