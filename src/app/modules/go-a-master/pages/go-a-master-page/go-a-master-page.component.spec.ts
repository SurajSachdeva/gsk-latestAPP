import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAMasterPageComponent } from './go-a-master-page.component';

describe('GoAMasterPageComponent', () => {
  let component: GoAMasterPageComponent;
  let fixture: ComponentFixture<GoAMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoAMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
