import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActionsRx } from '../../state/actions';
import { detailedContactSelector } from '../../state/selector';
import { Observable } from 'rxjs';
import { ContentCache, ContentState } from '../../models/backend.model';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [MatToolbarModule, RouterModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  store: Store = inject(Store);
  contact$?: Observable<
    | {
        id: number;
        contact: ContentCache<{
          contract: Contact;
        }>;
      }
    | undefined
  >;
  readonly ContentState = ContentState;

  constructor(private route: ActivatedRoute, private router: Router) {
    let id = this.route.snapshot.params['id'];
    if (!id) this.router.navigate(['/']);
    this.store.dispatch(ActionsRx.loadContact({ id }));
    this.contact$ = this.store.select(detailedContactSelector(id));
  }
}
