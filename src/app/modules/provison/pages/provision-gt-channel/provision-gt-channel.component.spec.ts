import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionGtChannelComponent } from './provision-gt-channel.component';

describe('ProvisionGtChannelComponent', () => {
  let component: ProvisionGtChannelComponent;
  let fixture: ComponentFixture<ProvisionGtChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionGtChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionGtChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
