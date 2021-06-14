import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdtCityMasterPageComponent } from './cdt-city-master-page.component';

describe('CdtCityMasterPageComponent', () => {
  let component: CdtCityMasterPageComponent;
  let fixture: ComponentFixture<CdtCityMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdtCityMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdtCityMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
