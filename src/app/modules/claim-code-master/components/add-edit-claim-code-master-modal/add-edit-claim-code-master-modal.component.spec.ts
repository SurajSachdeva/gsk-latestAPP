import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClaimCodeMasterModalComponent } from './add-edit-claim-code-master-modal.component';

describe('AddEditClaimCodeMasterModalComponent', () => {
  let component: AddEditClaimCodeMasterModalComponent;
  let fixture: ComponentFixture<AddEditClaimCodeMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditClaimCodeMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditClaimCodeMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
