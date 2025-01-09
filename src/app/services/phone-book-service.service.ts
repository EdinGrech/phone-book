import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BackendWrapper } from '../models/backend.model';
import { Contact, ContactSummery } from '../models/contact.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhoneBookServiceService {
  constructor(private http: HttpClient) {}

  getContactSummery() {
    return this.http
      .get<BackendWrapper<ContactSummery[]>>(`${environment.api}/contacts`)
      .pipe(map((res) => res.data));
  }

  getContact(id: number) {
    return this.http
      .get<BackendWrapper<Contact>>(`${environment.api}/contacts/${id}`)
      .pipe(map((res) => res.data));
  }

  postContact(contact: Contact) {
    return this.http.post(`${environment.api}/contacts`, {
      contact,
    });
  }
}
