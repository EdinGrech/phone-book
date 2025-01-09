import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './reducer';

export const appStateSelector = createFeatureSelector<AppState>('app');

export const contactsSelector = createSelector(
  appStateSelector,
  (state: AppState) => state.contacts
);
export const detailedContactSelector = (id: number) =>
  createSelector(appStateSelector, (state: AppState) =>
    state.detailedContact.find((dc) => dc.id === id)
  );
