import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Model/User/user";
import { ServiceTypeService } from "src/app/Service/ServiceTypeService/service-type.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { ServieType } from "src/app/Model/serviceType/servie-type";
import { Router } from "@angular/router";
@Component({
  selector: "app-service-type",
  templateUrl: "./service-type.component.html",
  styleUrls: ["./service-type.component.scss"],
})
export class ServiceTypeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private serviceTypeService: ServiceTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getService();
  }

  userProfile: User = new User();
  service: ServieType[];
  serviceDeleted: boolean = false;
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
        this.getService();
        this.serviceDeleted = true;
      });
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
