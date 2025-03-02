import type { TranslationKey } from './translation';

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  fieldErrors?: FieldError[];
  i18nKey: TranslationKey;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface DeleteResponse {
  count: number; // The number of items deleted
}
