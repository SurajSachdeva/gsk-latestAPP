import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualCanvasChannelComponent } from './actual-canvas-channel.component';

describe('ActualCanvasChannelComponent', () => {
  let component: ActualCanvasChannelComponent;
  let fixture: ComponentFixture<ActualCanvasChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualCanvasChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualCanvasChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
