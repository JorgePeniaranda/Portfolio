import type { TranslationKey } from '@/types/translation';

import { isDefined } from '../guards/is-defined';

export interface ErrorServiceValidationError {
  field: string;
  message: TranslationKey;
}

export class ServiceError extends Error {
  public readonly name: TranslationKey;
  public readonly isValidationError: boolean = false;
  public readonly fieldErrors: ErrorServiceValidationError[] | undefined;

  constructor(message: TranslationKey, fieldErrors?: ErrorServiceValidationError[]) {
    super(message);
    this.fieldErrors = fieldErrors;
    this.name = 'handler.service.generic-error';

    if (isDefined(fieldErrors)) {
      this.isValidationError = true;
    }
  }
}
