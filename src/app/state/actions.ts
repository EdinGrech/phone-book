import { createAction, props } from '@ngrx/store';
import { Contact, ContactSummery } from '../models/contact.model';

export namespace ActionsRx {
  export const loadContactSummery = createAction(
    '[Contact] Load Contact Summery'
  );
  export const loadContactSummerySuccess = createAction(
    '[Contact] Load Contact Summery Success',
    props<{ contactSummery: ContactSummery[] }>()
  );
  export const loadContactSummeryFail = createAction(
    '[Contact] Load Contact Summery Fail',
    props<{ error: string }>()
  );

  export const loadContact = createAction(
    '[Contact] Load Contact',
    props<{ id: number }>()
  );
  export const loadContactSuccess = createAction(
    '[Contact] Load Contact Success',
    props<{ contact: Contact }>()
  );
  export const loadContactFail = createAction(
    '[Contact] Load Contact Fail',
    props<{ error: string }>()
  );
}
