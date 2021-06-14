import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCdtRateMasterModalComponent } from './add-edit-cdt-rate-master-modal.component';

describe('AddEditCdtRateMasterModalComponent', () => {
  let component: AddEditCdtRateMasterModalComponent;
  let fixture: ComponentFixture<AddEditCdtRateMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCdtRateMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCdtRateMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
