import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMobileMoneyComponent } from './ajout-mobile-money.component';

describe('AjoutMobileMoneyComponent', () => {
  let component: AjoutMobileMoneyComponent;
  let fixture: ComponentFixture<AjoutMobileMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutMobileMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutMobileMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
