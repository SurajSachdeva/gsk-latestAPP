import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSdrMasterModalComponent } from './add-edit-sdr-master-modal.component';

describe('AddEditSdrMasterModalComponent', () => {
  let component: AddEditSdrMasterModalComponent;
  let fixture: ComponentFixture<AddEditSdrMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSdrMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSdrMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
