import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCdtCityMasterModalComponent } from './add-edit-cdt-city-master-modal.component';

describe('AddEditCdtCityMasterModalComponent', () => {
  let component: AddEditCdtCityMasterModalComponent;
  let fixture: ComponentFixture<AddEditCdtCityMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCdtCityMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCdtCityMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
