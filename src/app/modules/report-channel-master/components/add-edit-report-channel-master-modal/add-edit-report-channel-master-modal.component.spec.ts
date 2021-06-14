import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReportChannelMasterModalComponent } from './add-edit-report-channel-master-modal.component';

describe('AddEditReportChannelMasterModalComponent', () => {
  let component: AddEditReportChannelMasterModalComponent;
  let fixture: ComponentFixture<AddEditReportChannelMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditReportChannelMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditReportChannelMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
