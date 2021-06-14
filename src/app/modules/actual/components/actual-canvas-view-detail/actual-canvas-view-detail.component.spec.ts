import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualCanvasViewDetailComponent } from './actual-canvas-view-detail.component';

describe('ActualCanvasViewDetailComponent', () => {
  let component: ActualCanvasViewDetailComponent;
  let fixture: ComponentFixture<ActualCanvasViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualCanvasViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualCanvasViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
