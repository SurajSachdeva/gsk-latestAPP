import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionCdtChannelComponent } from './provision-cdt-channel.component';

describe('ProvisionCdtChannelComponent', () => {
  let component: ProvisionCdtChannelComponent;
  let fixture: ComponentFixture<ProvisionCdtChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionCdtChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionCdtChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
