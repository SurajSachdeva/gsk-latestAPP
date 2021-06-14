import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandRatioMasterPageComponent } from './brand-ratio-master-page.component';

describe('BrandRatioMasterPageComponent', () => {
  let component: BrandRatioMasterPageComponent;
  let fixture: ComponentFixture<BrandRatioMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandRatioMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandRatioMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
