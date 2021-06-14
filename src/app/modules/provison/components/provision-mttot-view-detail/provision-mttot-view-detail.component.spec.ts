import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionMttotViewDetailComponent } from './provision-mttot-view-detail.component';

describe('ProvisionMttotViewDetailComponent', () => {
  let component: ProvisionMttotViewDetailComponent;
  let fixture: ComponentFixture<ProvisionMttotViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionMttotViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionMttotViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
