import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotCustomerMasterPageComponent } from './tot-customer-master-page.component';

describe('TotCustomerMasterPageComponent', () => {
  let component: TotCustomerMasterPageComponent;
  let fixture: ComponentFixture<TotCustomerMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotCustomerMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotCustomerMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
