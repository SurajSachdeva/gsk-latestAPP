import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalWorkflowPageComponent } from './approval-workflow-page.component';

describe('ApprovalWorkflowPageComponent', () => {
  let component: ApprovalWorkflowPageComponent;
  let fixture: ComponentFixture<ApprovalWorkflowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalWorkflowPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalWorkflowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
