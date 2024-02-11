import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationAccountComponent } from './activation-account.component';

describe('ActivationAccountComponent', () => {
  let component: ActivationAccountComponent;
  let fixture: ComponentFixture<ActivationAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationAccountComponent]
    });
    fixture = TestBed.createComponent(ActivationAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
