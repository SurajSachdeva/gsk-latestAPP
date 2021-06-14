import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  heading: string = "";
  message: string = "";

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }


  onCancel() {
    this.activeModal.dismiss();
  }
}
