import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNextDocNumberModalComponent } from './add-edit-next-doc-number-modal.component';

describe('AddEditNextDocNumberModalComponent', () => {
  let component: AddEditNextDocNumberModalComponent;
  let fixture: ComponentFixture<AddEditNextDocNumberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditNextDocNumberModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNextDocNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
