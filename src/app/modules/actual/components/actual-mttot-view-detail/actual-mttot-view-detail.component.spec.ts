import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualMttotViewDetailComponent } from './actual-mttot-view-detail.component';

describe('ActualMttotViewDetailComponent', () => {
  let component: ActualMttotViewDetailComponent;
  let fixture: ComponentFixture<ActualMttotViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualMttotViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualMttotViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
