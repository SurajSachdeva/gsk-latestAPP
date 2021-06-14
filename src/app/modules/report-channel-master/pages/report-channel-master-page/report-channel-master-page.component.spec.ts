import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportChannelMasterPageComponent } from './report-channel-master-page.component';

describe('ReportChannelMasterPageComponent', () => {
  let component: ReportChannelMasterPageComponent;
  let fixture: ComponentFixture<ReportChannelMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportChannelMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportChannelMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
