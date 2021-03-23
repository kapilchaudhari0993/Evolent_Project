import { ContactDetailService } from './../../shared/contact-detail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styles: []
})
export class ContactDetailsComponent implements OnInit {

  constructor(public service: ContactDetailService) { }

  ngOnInit() {
    this.service.refreshList();
  }
  populateForm(selectedRecord) {
	this.service.formData = Object.assign({}, selectedRecord);
}
onDelete(id) {
  if (confirm('Are you sure to delete this record ?')) {
    this.service.deleteContactDetail(id)
      .subscribe(res => {
        this.service.refreshList();
      },
      err => { console.log(err); })
  }
}
}