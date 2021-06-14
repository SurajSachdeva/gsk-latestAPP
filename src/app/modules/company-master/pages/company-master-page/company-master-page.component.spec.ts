import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMasterPageComponent } from './company-master-page.component';

describe('CompanyMasterPageComponent', () => {
  let component: CompanyMasterPageComponent;
  let fixture: ComponentFixture<CompanyMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
