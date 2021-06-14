import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarksModalComponent } from './remarks-modal.component';

describe('RemarksModalComponent', () => {
  let component: RemarksModalComponent;
  let fixture: ComponentFixture<RemarksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarksModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
