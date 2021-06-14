import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualGtViewDetailComponent } from './actual-gt-view-detail.component';

describe('ActualGtViewDetailComponent', () => {
  let component: ActualGtViewDetailComponent;
  let fixture: ComponentFixture<ActualGtViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualGtViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualGtViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
