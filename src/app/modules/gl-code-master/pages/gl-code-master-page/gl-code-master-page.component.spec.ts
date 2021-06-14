import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlCodeMasterPageComponent } from './gl-code-master-page.component';

describe('GlCodeMasterPageComponent', () => {
  let component: GlCodeMasterPageComponent;
  let fixture: ComponentFixture<GlCodeMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlCodeMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlCodeMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
