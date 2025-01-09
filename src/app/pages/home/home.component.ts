import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { contactsSelector } from '../../state/selector';
import { ContactSummery } from '../../models/contact.model';
import { ContentCache, ContentState } from '../../models/backend.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActionsRx } from '../../state/actions';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatToolbarModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly ContentState = ContentState;
  store: Store = inject(Store);

  contactData$: Observable<ContentCache<ContactSummery[]>> =
    this.store.select(contactsSelector);

  constructor() {
    this.store.dispatch(ActionsRx.loadContactSummery());
  }
}
