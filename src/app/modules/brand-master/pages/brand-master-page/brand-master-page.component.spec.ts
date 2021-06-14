import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMasterPageComponent } from './brand-master-page.component';

describe('BrandMasterPageComponent', () => {
  let component: BrandMasterPageComponent;
  let fixture: ComponentFixture<BrandMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
