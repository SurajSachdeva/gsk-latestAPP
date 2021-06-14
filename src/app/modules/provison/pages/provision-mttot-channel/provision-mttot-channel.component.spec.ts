import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionMttotChannelComponent } from './provision-mttot-channel.component';

describe('ProvisionMttotChannelComponent', () => {
  let component: ProvisionMttotChannelComponent;
  let fixture: ComponentFixture<ProvisionMttotChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionMttotChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionMttotChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
