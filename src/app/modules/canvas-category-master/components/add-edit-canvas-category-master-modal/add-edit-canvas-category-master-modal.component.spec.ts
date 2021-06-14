import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCanvasCategoryMasterModalComponent } from './add-edit-canvas-category-master-modal.component';

describe('AddEditCanvasCategoryMasterModalComponent', () => {
  let component: AddEditCanvasCategoryMasterModalComponent;
  let fixture: ComponentFixture<AddEditCanvasCategoryMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCanvasCategoryMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCanvasCategoryMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
