import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCompanyMasterModalComponent } from './add-edit-company-master-modal.component';

describe('AddEditCompanyMasterModalComponent', () => {
  let component: AddEditCompanyMasterModalComponent;
  let fixture: ComponentFixture<AddEditCompanyMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCompanyMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCompanyMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
