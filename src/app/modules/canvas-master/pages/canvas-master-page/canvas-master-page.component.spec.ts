import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasMasterPageComponent } from './canvas-master-page.component';

describe('CanvasMasterPageComponent', () => {
  let component: CanvasMasterPageComponent;
  let fixture: ComponentFixture<CanvasMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
