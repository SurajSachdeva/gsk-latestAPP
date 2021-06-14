import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualGtChannelComponent } from './actual-gt-channel.component';

describe('ActualGtChannelComponent', () => {
  let component: ActualGtChannelComponent;
  let fixture: ComponentFixture<ActualGtChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualGtChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualGtChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
