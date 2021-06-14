import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionCanvasViewDetailComponent } from './provision-canvas-view-detail.component';

describe('ProvisionCanvasViewDetailComponent', () => {
  let component: ProvisionCanvasViewDetailComponent;
  let fixture: ComponentFixture<ProvisionCanvasViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionCanvasViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionCanvasViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
