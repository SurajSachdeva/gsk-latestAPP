import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonCreationSheetComponent } from './won-creation-sheet.component';

describe('WonCreationSheetComponent', () => {
  let component: WonCreationSheetComponent;
  let fixture: ComponentFixture<WonCreationSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WonCreationSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WonCreationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
