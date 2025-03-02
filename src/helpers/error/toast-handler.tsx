import type { TranslationKey } from '@/types/translation';

import React from 'react';
import { ToastAction } from '@radix-ui/react-toast';

import { isDefined } from '../guards/is-defined';

import { ServiceError } from './service-error';

import { MessageDisplay } from '@/components/atoms/message-display';
import { toast } from '@/hooks/use-toast';
import { TranslateText } from '@/components/atoms/translated-text';

/**
 * Handle an error and display a toast message.
 * @param params - Function parameters
 * @param params.error - The error to handle
 * @param params.title - The title of the toast message
 * @param params.defaultErrorMessage - The default error message to use if the error does not contain one
 * @param params.tryAgain - The function to call when the user clicks the try again button
 */
export function handleErrorWithToast({
  error,
  title,
  defaultErrorMessage = 'handler.toast.error.status-messages.generic-error',
  tryAgain,
}: {
  error: unknown;
  title?: TranslationKey;
  defaultErrorMessage?: TranslationKey;
  tryAgain?: () => void;
}): void {
  if (error instanceof ServiceError) {
    if (error.isValidationError === true) {
      toast({
        title,
        description: error.fieldErrors?.map((line, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            {line.field}: <TranslateText key={line.message} />
            <br />
          </React.Fragment>
        )),
        className: 'bg-red-500 text-white',
        action: isDefined(tryAgain) ? (
          <ToastAction altText='Reintentar' onClick={tryAgain}>
            <TranslateText key='handler.toast.button.try-again' />
          </ToastAction>
        ) : undefined,
      });

      return;
    }

    toast({
      title,
      description: <MessageDisplay message={error.message} />,
      className: 'bg-red-500 text-white',
      action: isDefined(tryAgain) ? (
        <ToastAction altText='Reintentar' onClick={tryAgain}>
          <TranslateText key='handler.toast.button.try-again' />
        </ToastAction>
      ) : undefined,
    });

    return;
  }

  if (error instanceof Error) {
    toast({
      title,
      description: <MessageDisplay message={error.message} />,
      className: 'bg-red-500 text-white',
      action: isDefined(tryAgain) ? (
        <ToastAction altText='Reintentar' onClick={tryAgain}>
          <TranslateText key='handler.toast.button.try-again' />
        </ToastAction>
      ) : undefined,
    });

    return;
  }

  toast({
    title,
    description: defaultErrorMessage,
    className: 'bg-red-500 text-white',
    action: isDefined(tryAgain) ? (
      <ToastAction altText='Reintentar' onClick={tryAgain}>
        <TranslateText key='handler.toast.button.try-again' />
      </ToastAction>
    ) : undefined,
  });
}
