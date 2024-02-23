import { formatDate } from '@angular/common';
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
  newRendezVous:RendezVous = new RendezVous();

  UserQuery: User = new User();
  listEmploye:User[];
  employeSelected:User = new User();
  isEmployeeFreeBool:boolean = true;

  page = "liste_rendez_vous";

  serviceList:ServieType[];
  serviceSelected:ServieType = new ServieType();

  constructor(private rendezVousService:RendezVousService, private userService:UserService, private serviceTypeService:ServiceTypeService) { }

  ngOnInit(): void {
    this.userService.GetUserByToken().subscribe((response: any) => {
      this.UserQuery = response.user;
      this.getAllRendezVous();
      this.getServices();
      this.getEmployee();
    });   
  }

  isEmployeeFree() {
    let ans:boolean;
    if(this.employeSelected && this.newRendezVous.start) {
      this.rendezVousService.findByUser(this.employeSelected).subscribe((response: any) => {
        let  empRDV:RendezVous[] = response.rendezVous;
        empRDV = empRDV.filter(response => 
          response.status != 'annuler' &&
          (new Date(response.start) <= new Date(this.newRendezVous.start) && new Date(response.end) >= new Date(this.newRendezVous.start) || 
          new Date(response.end) >= new Date(this.newRendezVous.end)  && new Date(response.start) <= new Date(this.newRendezVous.end))
        );
        console.log(empRDV);
        if(empRDV.length > 0) this.isEmployeeFreeBool = false;
        else this.isEmployeeFreeBool = true;
      //   console.log(empRDV);
      //   if(empRDV.length > 0) {
      //     console.log("Emp manana rendezVous");
      //     for(let rdv of empRDV) {
      //       if(new Date(rdv.start) < new Date(this.newRendezVous.start) && new Date(rdv.end) > new Date(this.newRendezVous.start) || 
      //       new Date(rdv.end) > new Date(this.newRendezVous.end) && new Date(rdv.start) < new Date(this.newRendezVous.end)) {
      //         console.log("emp non dispo");
      //         this.isEmployeeFreeBool = false;

      //         console.log("Rendez vous start => ",new Date(rdv.start));
      //         console.log("Rendez vous select start => ",new Date(this.newRendezVous.start));
      //         console.log("Rendez vous end => ",new Date(rdv.end));
      //         console.log("Rendez vous select end => ",new Date(this.newRendezVous.end));
      //         ans = false;
      //         console.log(ans);
      //         break;
      //       } else {
      //         ans = true;
      //         console.log("Emp dispo")
      //         this.isEmployeeFreeBool = true;
      //         console.log(ans);
      //       }
      //     }
      //   } else console.log("Emp tsy manana rendezVous"); ans = true;
      });
    } else console.log("Tsy misy empSelec sy nwRDVStrt");
  }

  getAllRendezVous() {
    this.rendezVousService.findByUser(this.UserQuery)
      .subscribe((response: any) => {
        console.log(response);
        this.listeRendezVous = response.rendezVous;
        console.log(this.listeRendezVous);
      });
  }

  getServices() {
    this.serviceTypeService.ListService()
      .subscribe((response: any) => {
        this.serviceList = response.service;
        this.serviceSelected = this.serviceList[0];
        this.newRendezVous.serviceAsked = { idService: this.serviceSelected._id, nom: this.serviceSelected.nom, prix: this.serviceSelected.prix};
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

  getEmployee() {
    this.userService.findByRole('employe').subscribe((response: any) => {
      this.listEmploye = response.Users;
      console.log(this.listEmploye);
      this.employeSelected = this.listEmploye[0];
      this.newRendezVous.employee = { idEmployee: this.employeSelected._id, nomEmployee: this.employeSelected.name };
      this.newRendezVous.employee.idEmployee = this.employeSelected._id;
      this.newRendezVous.employee.nomEmployee = this.employeSelected.name;
    })
  }

  setServiceSelected() {
    this.newRendezVous.serviceAsked = { idService: this.serviceSelected._id, nom: this.serviceSelected.nom, prix: this.serviceSelected.prix };
  }

  setEmployeSelected() {
    this.newRendezVous.employee = { idEmployee: this.employeSelected._id, nomEmployee: this.employeSelected.name };
    this.isEmployeeFree();
  }

  addEndTimeRDV(start:string):string {
    this.isEmployeeFree();
    const dateDebut:Date = new Date(this.newRendezVous.start);

    const date = dateDebut.getDate();
    const month = dateDebut.getMonth() + 1;
    const year = dateDebut.getFullYear();
    const hours = dateDebut.getHours();
    const minutes = dateDebut.getMinutes();

    const timeToAddInMinutes = this.serviceSelected.durre; 
    const newMinutes = (minutes + timeToAddInMinutes) % 60;
    const newHours = Math.floor((minutes + timeToAddInMinutes) / 60);

    const newDate = new Date(year, month - 1, date, hours + newHours, newMinutes);

    const formattedDate = newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    
    const formattedTime = newDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.newRendezVous.end = formatDate(newDate.getTime().toString(), 'yyyy-MM-dd HH:mm', 'en-US');
    return formatDate(newDate.getTime().toString(), 'yyyy-MM-dd HH:mm', 'en-US')
  }

  createRDV() {
    if(this.newRendezVous.start) {
      this.newRendezVous.status = "en attente";
      this.newRendezVous.end = this.addEndTimeRDV(this.newRendezVous.start);
      this.newRendezVous.client = { idClient: this.UserQuery._id, nomClient: this.UserQuery.name };
      this.newRendezVous.start = formatDate(new Date(this.newRendezVous.start).toString(), 'yyyy-MM-dd HH:mm', 'en-US');
      this.newRendezVous.isConfirmed = false;
      this.newRendezVous.isDone = false;
      console.log(this.newRendezVous);
      this.rendezVousService.create(this.newRendezVous).subscribe((response:any) => {
        this.page = "liste_rendez_vous";
        this.getAllRendezVous();
        this.newRendezVous = new RendezVous();
      })
    } else this.isEmployeeFreeBool = false;
  }

  updateRendezVous(rendezVous:RendezVous) {
    this.rendezVousService.update(rendezVous._id, rendezVous).subscribe((response:any) => {
      this.getAllRendezVous();
    })
  }

  setRendezVousToAnnuler(rendezVous:RendezVous) {
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
