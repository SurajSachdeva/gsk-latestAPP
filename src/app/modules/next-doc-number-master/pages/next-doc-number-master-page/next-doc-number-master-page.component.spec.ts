import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDocNumberMasterPageComponent } from './next-doc-number-master-page.component';

describe('NextDocNumberMasterPageComponent', () => {
  let component: NextDocNumberMasterPageComponent;
  let fixture: ComponentFixture<NextDocNumberMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextDocNumberMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextDocNumberMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
