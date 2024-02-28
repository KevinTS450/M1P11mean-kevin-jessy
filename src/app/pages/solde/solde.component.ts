import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { MobileMoney } from 'src/app/Model/MobileMoney/mobile-money';
import { User } from 'src/app/Model/User/user';
import { MobileMoneyService } from 'src/app/Service/MobileMoneyService/mobile-money.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-solde',
  templateUrl: './solde.component.html',
  styleUrls: ['./solde.component.scss']
})
export class SoldeComponent implements OnInit {

  isRecharging = false;
  rechargeValue:number;
  newMobileMoney = new MobileMoney();
  myMobileMoney = new MobileMoney();
  UserQuery: User = new User();

  constructor(private mobileMoneyService:MobileMoneyService, private userService:UserService) { }

  ngOnInit(): void {
    this.GetUser();
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

  GetUser() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        this.UserQuery = response.user;
        this.getMyMobileMoney();
      });
    } catch (error) {
      console.error(error);
    }
  }

  recharging() {
    this.isRecharging = true;
  }

  validRecharging() {
    this.newMobileMoney.monnaie = this.myMobileMoney.monnaie + this.rechargeValue;
    this.newMobileMoney.operateurNom = 'MVola';
    this.newMobileMoney.user = this.UserQuery;
    this.newMobileMoney._id = this.myMobileMoney._id;
    console.log(this.newMobileMoney);
    this.updateMobileMoney(this.newMobileMoney);
    // else this.createMobileMoney(this.newMobileMoney);
  }

  updateMobileMoney(mobileMoneyToUpdate:MobileMoney) {
    this.mobileMoneyService.updateMobileMoney(mobileMoneyToUpdate).subscribe((response:any) => {
      this.getMyMobileMoney();
      this.isRecharging = false;
      this.rechargeValue = 0;
    });
  }

  createMobileMoney(newMobileMoney:MobileMoney) {
    this.mobileMoneyService.createMobileMoney(newMobileMoney).subscribe((response:any) => {
      this.isRecharging = false;
      this.rechargeValue = 0;
    });
  }
}
