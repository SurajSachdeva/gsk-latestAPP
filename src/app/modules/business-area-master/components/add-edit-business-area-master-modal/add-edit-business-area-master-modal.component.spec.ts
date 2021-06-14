import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBusinessAreaMasterModalComponent } from './add-edit-business-area-master-modal.component';

describe('AddEditBusinessAreaMasterModalComponent', () => {
  let component: AddEditBusinessAreaMasterModalComponent;
  let fixture: ComponentFixture<AddEditBusinessAreaMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBusinessAreaMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBusinessAreaMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
