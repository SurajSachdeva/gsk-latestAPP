import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionCanvasChannelComponent } from './provision-canvas-channel.component';

describe('ProvisionCanvasChannelComponent', () => {
  let component: ProvisionCanvasChannelComponent;
  let fixture: ComponentFixture<ProvisionCanvasChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionCanvasChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionCanvasChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
