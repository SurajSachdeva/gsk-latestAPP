import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditChannelMasterModalComponent } from './add-edit-channel-master-modal.component';

describe('AddEditChannelMasterModalComponent', () => {
  let component: AddEditChannelMasterModalComponent;
  let fixture: ComponentFixture<AddEditChannelMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditChannelMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditChannelMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
