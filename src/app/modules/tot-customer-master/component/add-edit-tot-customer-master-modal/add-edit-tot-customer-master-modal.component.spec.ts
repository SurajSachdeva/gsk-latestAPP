import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTotCustomerMasterModalComponent } from './add-edit-tot-customer-master-modal.component';

describe('AddEditTotCustomerMasterModalComponent', () => {
  let component: AddEditTotCustomerMasterModalComponent;
  let fixture: ComponentFixture<AddEditTotCustomerMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTotCustomerMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTotCustomerMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
