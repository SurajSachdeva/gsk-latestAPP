import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotMasterPageComponent } from './tot-master-page.component';

describe('TotMasterPageComponent', () => {
  let component: TotMasterPageComponent;
  let fixture: ComponentFixture<TotMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
