import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualSdrViewDetailComponent } from './actual-sdr-view-detail.component';

describe('ActualSdrViewDetailComponent', () => {
  let component: ActualSdrViewDetailComponent;
  let fixture: ComponentFixture<ActualSdrViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualSdrViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualSdrViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
