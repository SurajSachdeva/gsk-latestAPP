import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualMttotChannelComponent } from './actual-mttot-channel.component';

describe('ActualMttotChannelComponent', () => {
  let component: ActualMttotChannelComponent;
  let fixture: ComponentFixture<ActualMttotChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualMttotChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualMttotChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
