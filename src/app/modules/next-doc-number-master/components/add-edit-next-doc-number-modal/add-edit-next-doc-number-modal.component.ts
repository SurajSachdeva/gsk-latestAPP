import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit-next-doc-number-modal',
  templateUrl: './add-edit-next-doc-number-modal.component.html',
  styleUrls: ['./add-edit-next-doc-number-modal.component.scss']
})
export class AddEditNextDocNumberModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  onCancel(){
    this.activeModal.close();
  }

}
