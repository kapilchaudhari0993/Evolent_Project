import { ContactDetail } from './contact-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactDetailService {

  formData: ContactDetail= new ContactDetail();
  readonly baseURL = 'http://localhost:61236/api/contacts';
  list : ContactDetail[];

  constructor(private http: HttpClient) { }

  postContactDetail() {
    return this.http.post(this.baseURL, this.formData);
  }
  putContactDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }
  deleteContactDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as ContactDetail[]);
  }
}