import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualSdrChannelComponent } from './actual-sdr-channel.component';

describe('ActualSdrChannelComponent', () => {
  let component: ActualSdrChannelComponent;
  let fixture: ComponentFixture<ActualSdrChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualSdrChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualSdrChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
