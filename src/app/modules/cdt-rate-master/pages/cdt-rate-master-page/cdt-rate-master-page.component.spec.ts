import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdtRateMasterPageComponent } from './cdt-rate-master-page.component';

describe('CdtRateMasterPageComponent', () => {
  let component: CdtRateMasterPageComponent;
  let fixture: ComponentFixture<CdtRateMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdtRateMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdtRateMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
