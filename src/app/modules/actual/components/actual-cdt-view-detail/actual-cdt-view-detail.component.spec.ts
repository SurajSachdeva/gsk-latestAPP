import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualCdtViewDetailComponent } from './actual-cdt-view-detail.component';

describe('ActualCdtViewDetailComponent', () => {
  let component: ActualCdtViewDetailComponent;
  let fixture: ComponentFixture<ActualCdtViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualCdtViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualCdtViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
