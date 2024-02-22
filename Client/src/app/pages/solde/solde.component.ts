import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solde',
  templateUrl: './solde.component.html',
  styleUrls: ['./solde.component.scss']
})
export class SoldeComponent implements OnInit {

  isRecharging = false;

  constructor() { }

  ngOnInit(): void {
  }

  recharging() {
    this.isRecharging = true;
  }

  validRecharging() {
    this.isRecharging = false;
  }
}
