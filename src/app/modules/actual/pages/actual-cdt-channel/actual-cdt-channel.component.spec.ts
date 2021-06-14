import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualCdtChannelComponent } from './actual-cdt-channel.component';

describe('ActualCdtChannelComponent', () => {
  let component: ActualCdtChannelComponent;
  let fixture: ComponentFixture<ActualCdtChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualCdtChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualCdtChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
