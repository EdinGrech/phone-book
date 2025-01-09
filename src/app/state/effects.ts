import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PhoneBookServiceService } from '../services/phone-book-service.service';
import { switchMap, map, catchError, of } from 'rxjs';
import { ActionsRx } from './actions';

@Injectable()
export class AppRxEffects {
  actions$: Actions = inject(Actions);
  phoneBookService: PhoneBookServiceService = inject(PhoneBookServiceService);

  loadContactSummery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsRx.loadContactSummery),
      switchMap(() =>
        this.phoneBookService.getContactSummery().pipe(
          map((contactSummery) =>
            ActionsRx.loadContactSummerySuccess({ contactSummery })
          ),
          catchError((error) => of(ActionsRx.loadContactSummeryFail({ error })))
        )
      )
    )
  );

  loadContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsRx.loadContact),
      switchMap(({ id }) =>
        this.phoneBookService.getContact(id).pipe(
          map((contact) => ActionsRx.loadContactSuccess({ contact })),
          catchError((error) => of(ActionsRx.loadContactFail({ error })))
        )
      )
    )
  );
}
