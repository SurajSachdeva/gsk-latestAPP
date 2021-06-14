import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAccountMasterPageComponent } from './chart-account-master-page.component';

describe('ChartAccountMasterPageComponent', () => {
  let component: ChartAccountMasterPageComponent;
  let fixture: ComponentFixture<ChartAccountMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartAccountMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAccountMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
