import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionCdtViewDetailComponent } from './provision-cdt-view-detail.component';

describe('ProvisionCdtViewDetailComponent', () => {
  let component: ProvisionCdtViewDetailComponent;
  let fixture: ComponentFixture<ProvisionCdtViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionCdtViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionCdtViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
