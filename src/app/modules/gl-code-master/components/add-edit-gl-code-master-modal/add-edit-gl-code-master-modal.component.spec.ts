import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGlCodeMasterModalComponent } from './add-edit-gl-code-master-modal.component';

describe('AddEditGlCodeMasterModalComponent', () => {
  let component: AddEditGlCodeMasterModalComponent;
  let fixture: ComponentFixture<AddEditGlCodeMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGlCodeMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGlCodeMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
