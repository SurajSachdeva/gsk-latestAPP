import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMasterPageComponent } from './customer-master-page.component';

describe('CustomerMasterPageComponent', () => {
  let component: CustomerMasterPageComponent;
  let fixture: ComponentFixture<CustomerMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
