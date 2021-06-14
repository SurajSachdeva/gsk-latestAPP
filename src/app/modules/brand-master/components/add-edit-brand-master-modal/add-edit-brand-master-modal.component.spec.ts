import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBrandMasterModalComponent } from './add-edit-brand-master-modal.component';

describe('AddEditBrandMasterModalComponent', () => {
  let component: AddEditBrandMasterModalComponent;
  let fixture: ComponentFixture<AddEditBrandMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBrandMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBrandMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
