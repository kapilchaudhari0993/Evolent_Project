import { ContactDetailService } from './../../shared/contact-detail.service';
import { ContactDetail } from 'src/app/shared/contact-detail.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-detail-form',
  templateUrl: './contact-detail-form.component.html',
  styles: []
})
export class ContactDetailFormComponent implements OnInit {

  constructor(public service: ContactDetailService) { }

  ngOnInit():void {
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new ContactDetail();
  }
 
insertRecord(form: NgForm) {
  this.service.postContactDetail().subscribe(
    res => {
      this.resetForm(form);
      this.service.refreshList();
    },
    err => { console.log(err); }
  )
}
onSubmit(form: NgForm) {
  if (this.service.formData.id == 0)
    this.insertRecord(form);
  else
    this.updateRecord(form);
}

updateRecord(form: NgForm) {
  this.service.putContactDetail().subscribe(
    res => {
      this.resetForm(form);
      this.service.refreshList();
    },
    err => {
      console.log(err);
    }
  )
}
}