import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGoAMasterModalComponent } from './add-edit-go-a-master-modal.component';

describe('AddEditGoAMasterModalComponent', () => {
  let component: AddEditGoAMasterModalComponent;
  let fixture: ComponentFixture<AddEditGoAMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGoAMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGoAMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
