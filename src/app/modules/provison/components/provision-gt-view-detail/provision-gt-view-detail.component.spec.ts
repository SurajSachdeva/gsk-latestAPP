import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionGtViewDetailComponent } from './provision-gt-view-detail.component';

describe('ProvisionGtViewDetailComponent', () => {
  let component: ProvisionGtViewDetailComponent;
  let fixture: ComponentFixture<ProvisionGtViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionGtViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionGtViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
