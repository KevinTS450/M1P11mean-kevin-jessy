import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User/user';
import { RendezVous } from 'src/app/Model/rendez-vous';
import { ServieType } from 'src/app/Model/serviceType/servie-type';
import { ServiceTypeService } from 'src/app/Service/ServiceTypeService/service-type.service';
import { UserService } from 'src/app/Service/UserService/user.service';
import { RendezVousService } from 'src/app/Service/rendezVous/rendez-vous.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {

  listeRendezVous:RendezVous[];
  newRendezVous:RendezVous;

  UserQuery: User = new User();

  page = "liste_rendez_vous";

  serviceList:ServieType[];

  constructor(private rendezVousService:RendezVousService, private userService:UserService, private serviceTypeService:ServiceTypeService) { }

  ngOnInit(): void {
    this.getAllRendezVous();
    this.GetUser();
    this.getServices();
  }

  getAllRendezVous() {
    this.rendezVousService.list()
      .subscribe((response: any) => {
        console.log(response);
        this.listeRendezVous = response.AllRendezVous;
        console.log(this.listeRendezVous);
      });
  }

  getServices() {
    this.serviceTypeService.ListService()
      .subscribe((response: any) => {
        this.serviceList = response.service;
      });
  }

  GetUser() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        this.UserQuery = response.user;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
