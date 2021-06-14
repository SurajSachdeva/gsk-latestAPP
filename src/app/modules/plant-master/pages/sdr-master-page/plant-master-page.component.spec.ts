import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantMasterPageComponent } from './plant-master-page.component';

describe('PlantMasterPageComponent', () => {
  let component: PlantMasterPageComponent;
  let fixture: ComponentFixture<PlantMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
