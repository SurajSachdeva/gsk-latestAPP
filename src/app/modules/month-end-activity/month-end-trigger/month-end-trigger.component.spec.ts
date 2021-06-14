import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthEndTriggerComponent } from './month-end-trigger.component';

describe('MonthEndTriggerComponent', () => {
  let component: MonthEndTriggerComponent;
  let fixture: ComponentFixture<MonthEndTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthEndTriggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthEndTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
