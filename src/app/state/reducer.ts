import { createReducer, on } from '@ngrx/store';
import { ContentCache, ContentState } from '../models/backend.model';
import { Contact, ContactSummery } from '../models/contact.model';
import { ActionsRx } from './actions';

export interface AppState {
  contacts: ContentCache<ContactSummery[]>;
  detailedContact: {
    id: number;
    contact: ContentCache<{ contract: Contact }>;
  }[];
}

export const initialState: AppState = {
  contacts: {
    state: ContentState.LOADING,
  },
  detailedContact: [],
};

export const reducer = createReducer(
  initialState,
  on(ActionsRx.loadContactSummery, (state) => ({
    ...state,
    contacts: {
      state: ContentState.LOADING,
    },
  })),
  on(ActionsRx.loadContactSummerySuccess, (state, { contactSummery }) => ({
    ...state,
    contacts: {
      state: ContentState.LOADED,
      data: contactSummery,
    },
  })),
  on(ActionsRx.loadContactSummeryFail, (state, { error }) => ({
    ...state,
    contacts: {
      state: ContentState.ERROR,
      error: error,
    },
  })),
  on(ActionsRx.loadContact, (state, { id }) => ({
    ...state,
    detailedContact: [
      ...state.detailedContact,
      { id, contact: { state: ContentState.LOADING } },
    ],
  })),
  on(ActionsRx.loadContactSuccess, (state, { contact }) => ({
    ...state,
    detailedContact: state.detailedContact.map((dc) =>
      dc.id == contact.id
        ? {
            id: dc.id,
            contact: {
              state: ContentState.LOADED,
              data: { contract: contact },
            },
          }
        : dc
    ),
  })),
  on(ActionsRx.loadContactFail, (state, { error }) => ({
    ...state,
    detailedContact: state.detailedContact.map((dc) => ({
      ...dc,
      contact: { state: ContentState.ERROR, error },
    })),
  }))
);
