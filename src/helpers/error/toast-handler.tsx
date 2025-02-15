import { ToastAction } from '@radix-ui/react-toast';

import { isDefined } from '../guards/is-defined';

import { MessageDisplay } from '@/components/atoms/message-display';
import { toast } from '@/hooks/use-toast';

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
  defaultErrorMessage = 'Ha ocurrido un error.',
  tryAgain,
}: {
  error: unknown;
  title?: string;
  defaultErrorMessage?: string;
  tryAgain?: () => void;
}): void {
  if (error instanceof Error) {
    toast({
      title,
      description: <MessageDisplay message={error.message} />,
      className: 'bg-red-500 text-white',
      action: isDefined(tryAgain) ? (
        <ToastAction altText='Reintentar' onClick={tryAgain}>
          Reintentar
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
        Reintentar
      </ToastAction>
    ) : undefined,
  });
}
