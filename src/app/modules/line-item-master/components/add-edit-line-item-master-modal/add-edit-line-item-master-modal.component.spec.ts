import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLineItemMasterModalComponent } from './add-edit-line-item-master-modal.component';

describe('AddEditLineItemMasterModalComponent', () => {
  let component: AddEditLineItemMasterModalComponent;
  let fixture: ComponentFixture<AddEditLineItemMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLineItemMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLineItemMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
