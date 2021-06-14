import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasCateogryMasterPageComponent } from './canvas-category-master-page.component';

describe('BrandMasterPageComponent', () => {
  let component: CanvasCateogryMasterPageComponent;
  let fixture: ComponentFixture<CanvasCateogryMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasCateogryMasterPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasCateogryMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
