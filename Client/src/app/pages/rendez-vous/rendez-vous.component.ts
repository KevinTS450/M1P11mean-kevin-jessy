import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MobileMoney } from 'src/app/Model/MobileMoney/mobile-money';
import { RendezVous } from 'src/app/Model/rendezVous/rendez-vous';
import { User } from 'src/app/Model/User/user';
import { Paiement } from 'src/app/Model/paiement/paiement';
import { ServieType } from 'src/app/Model/serviceType/servie-type';
import { MobileMoneyService } from 'src/app/Service/MobileMoneyService/mobile-money.service';
import { ServiceTypeService } from 'src/app/Service/ServiceTypeService/service-type.service';
import { UserService } from 'src/app/Service/UserService/user.service';
import { PaiementService } from 'src/app/Service/paiement/paiement.service';
import { RendezVousService } from 'src/app/Service/rendezVous/rendez-vous.service';
import { SocketService } from 'src/app/socket/socket.service';

@Component({
  selector: "app-rendez-vous",
  templateUrl: "./rendez-vous.component.html",
  styleUrls: ["./rendez-vous.component.scss"],
})
export class RendezVousComponent implements OnInit {
  listeRendezVous: RendezVous[];
  newRendezVous: RendezVous = new RendezVous();

  UserQuery: User = new User();
  listEmploye:User[];
  employeSelected:User = new User();
  isEmployeeFreeBool:boolean = true;
  factureValue = 0;
  mobileMoneyToPay = new MobileMoney();
  myMobileMoney = new MobileMoney();


  page = "liste_rendez_vous";
  now = new Date();

  serviceList:ServieType[];
  serviceSelected:ServieType = new ServieType();
  idRendezVousToPay: string;
  rendezVousToPay: RendezVous;

  constructor(private rendezVousService:RendezVousService, private userService:UserService, private serviceTypeService:ServiceTypeService,
    private mobileMoneyService:MobileMoneyService, private paiementService:PaiementService,private socketService:SocketService) { }

  ngOnInit(): void {
    this.userService.GetUserByToken().subscribe((response: any) => {
      this.UserQuery = response.user;
      this.getMyMobileMoney();
      this.getAllRendezVous();
      this.getServices();
      this.getEmployee();
      this.AutoRefresh();
    });
  }

  isEmployeeFree() {
    console.log(this.newRendezVous);
    if(this.employeSelected && this.newRendezVous.start) {
      this.rendezVousService.findByUser(this.employeSelected).subscribe((response: any) => {
        let  empRDV:RendezVous[] = response.rendezVous;
        empRDV = empRDV.filter(response => 
          response.status != 'annuler' &&
          (new Date(response.start) <= new Date(this.newRendezVous.start) && new Date(response.end) >= new Date(this.newRendezVous.start) || 
          new Date(response.end) >= new Date(this.newRendezVous.end)  && new Date(response.start) <= new Date(this.newRendezVous.end) ||
          new Date(response.start) <= new Date(this.newRendezVous.end) && new Date(response.end) >= new Date(this.newRendezVous.start))
        );
        console.log(empRDV);
        if(empRDV.length > 0) this.isEmployeeFreeBool = false;
        else this.isEmployeeFreeBool = true;
      });
    } else console.log("Tsy misy empSelec sy nwRDVStrt");
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
        durre: this.serviceSelected.durre,
        image: this.serviceSelected.image
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

  getEmployee() {
    this.userService.findByRole("employe").subscribe((response: any) => {
      this.listEmploye = response.Users;
      console.log(this.listEmploye);
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
      durre: this.serviceSelected.durre,
      image: this.serviceSelected.image
    };
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

  setRendezVousToAnnuler(rendezVous: RendezVous) {
    rendezVous.status = "annuler";
    this.updateRendezVous(rendezVous);
  }

  toggleWithGreeting(popover, rendezVous?:RendezVous) {
    if(rendezVous) {
      this.rendezVousToPay = rendezVous;
      this.factureValue = rendezVous.serviceAsked.prix;
      this.idRendezVousToPay = rendezVous._id;
    }
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }

  getMyMobileMoney() {
    try {
      this.mobileMoneyService.getMyMobileMoney(this.UserQuery).subscribe((response:any) => {
        if(response.mobileMoney) this.myMobileMoney = response.mobileMoney;
        else {
          this.getMyMobileMoney();
        }
        console.log(this.myMobileMoney);
      })
    } catch(error) {
      console.log(error);
    }
    
  }

  payer() {
    console.log("payer");
    this.userService.findByRole("manager").subscribe((response:any) => {
      const manager:User[] = response.Users;
      console.log(manager[0]);
      if(manager[0].email) {
        let paiement = new Paiement();
        paiement.idRendezVous = this.idRendezVousToPay;
        paiement.montant = this.factureValue;
        paiement.motif = "Paiement du rendez vous id = " + this.idRendezVousToPay + " .";
        paiement.temp = new Date().toLocaleString();

        this.paiementService.createPaiement(paiement).subscribe((response:any) => {
          console.log(this.myMobileMoney);
          this.myMobileMoney.monnaie = this.myMobileMoney.monnaie - this.factureValue;
          console.log(this.myMobileMoney);
          this.myMobileMoney.user = this.UserQuery;
          this.mobileMoneyService.updateMobileMoney(this.myMobileMoney).subscribe((response:any) => {
            console.log("userMoney after =>");
            console.log(response);
            this.getMyMobileMoney();
          });

          this.mobileMoneyService.getMyMobileMoney(manager[0]).subscribe((response:any) => {
            let managerMoney:MobileMoney = response.mobileMoney
            console.log(managerMoney);
            managerMoney.monnaie = managerMoney.monnaie + this.factureValue;
            managerMoney.user = manager[0];
            this.mobileMoneyService.updateMobileMoney(managerMoney).subscribe((response:any) => {
              console.log("managerMoney after =>");
              console.log(response);
            })
          });

          this.rendezVousToPay.status = 'confirmer';
          this.rendezVousService.update(this.rendezVousToPay._id, this.rendezVousToPay).subscribe((response:any) => {
            this.getAllRendezVous();
          });
        });
      }
    });
  }
}
