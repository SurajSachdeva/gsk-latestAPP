import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCanvasMasterModalComponent } from './add-edit-canvas-master-modal.component';

describe('AddEditCanvasMasterModalComponent', () => {
  let component: AddEditCanvasMasterModalComponent;
  let fixture: ComponentFixture<AddEditCanvasMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCanvasMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCanvasMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
