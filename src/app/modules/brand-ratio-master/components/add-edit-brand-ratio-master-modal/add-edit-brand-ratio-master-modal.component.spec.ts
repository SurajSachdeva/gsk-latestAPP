import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBrandRatioMasterModalComponent } from './add-edit-brand-ratio-master-modal.component';

describe('AddEditBrandRatioMasterModalComponent', () => {
  let component: AddEditBrandRatioMasterModalComponent;
  let fixture: ComponentFixture<AddEditBrandRatioMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBrandRatioMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBrandRatioMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
