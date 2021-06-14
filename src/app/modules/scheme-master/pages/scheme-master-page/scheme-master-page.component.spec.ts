import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeMasterPageComponent } from './scheme-master-page.component';

describe('SchemeMasterPageComponent', () => {
  let component: SchemeMasterPageComponent;
  let fixture: ComponentFixture<SchemeMasterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeMasterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
