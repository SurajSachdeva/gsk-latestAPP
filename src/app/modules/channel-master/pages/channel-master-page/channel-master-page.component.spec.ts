import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMasterPageComponent } from './channel-master-page.component';

describe('ChannelMasterPageComponent', () => {
  let component: ChannelMasterPageComponent;
  let fixture: ComponentFixture<ChannelMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
