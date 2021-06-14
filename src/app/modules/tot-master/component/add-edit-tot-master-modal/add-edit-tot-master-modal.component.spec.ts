import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTotMasterModalComponent } from './add-edit-tot-master-modal.component';

describe('AddEditTotMasterModalComponent', () => {
  let component: AddEditTotMasterModalComponent;
  let fixture: ComponentFixture<AddEditTotMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTotMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTotMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
