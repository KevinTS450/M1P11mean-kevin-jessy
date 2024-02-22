import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }
  

  openModal(content:any, size:string) {
    this.modalService.open(content, { size: size, backdrop: 'static' });
  }

  toggleWithGreeting(popover, greetings: string[], language: string) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open({greetings: greetings, language});
    }
  }
}
