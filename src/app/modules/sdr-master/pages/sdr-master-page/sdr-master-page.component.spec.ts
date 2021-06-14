import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdrMasterPageComponent } from './sdr-master-page.component';

describe('SdrMasterPageComponent', () => {
  let component: SdrMasterPageComponent;
  let fixture: ComponentFixture<SdrMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdrMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdrMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
