import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAreaMasterPageComponent } from './business-area-master-page.component';

describe('BusinessAreaMasterPageComponent', () => {
  let component: BusinessAreaMasterPageComponent;
  let fixture: ComponentFixture<BusinessAreaMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAreaMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAreaMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
