export interface BackendWrapper<T> {
  data: T;
  error: string;
}

export enum ContentState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  NOT_INITIALIZED = 'NOT_INITIALIZED',
}

export interface ContentCache<T> {
  data?: T;
  state: ContentState;
  error?: string;
}
