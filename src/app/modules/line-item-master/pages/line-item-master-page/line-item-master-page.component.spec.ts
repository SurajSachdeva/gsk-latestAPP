import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemMasterPageComponent } from './line-item-master-page.component';

describe('LineItemMasterPageComponent', () => {
  let component: LineItemMasterPageComponent;
  let fixture: ComponentFixture<LineItemMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineItemMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
