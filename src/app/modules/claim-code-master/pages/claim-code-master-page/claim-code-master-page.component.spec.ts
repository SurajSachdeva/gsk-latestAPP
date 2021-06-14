import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCodeMasterPageComponent } from './claim-code-master-page.component';

describe('ClaimCodeMasterPageComponent', () => {
  let component: ClaimCodeMasterPageComponent;
  let fixture: ComponentFixture<ClaimCodeMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCodeMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCodeMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
