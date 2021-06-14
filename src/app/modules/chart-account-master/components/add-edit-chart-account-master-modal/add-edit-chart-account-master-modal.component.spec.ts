import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditChartAccountMasterModalComponent } from './add-edit-chart-account-master-modal.component';

describe('AddEditChartAccountMasterModalComponent', () => {
  let component: AddEditChartAccountMasterModalComponent;
  let fixture: ComponentFixture<AddEditChartAccountMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditChartAccountMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditChartAccountMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
