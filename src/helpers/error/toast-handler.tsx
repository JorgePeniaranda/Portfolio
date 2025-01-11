import {MessageDisplay} from "@/components/atoms/message-display";
import {toast} from "@/hooks/use-toast";

/**
 * Handle an error and display a toast message.
 *
 * @param error - The error to handle.
 * @param title - The title of the toast message.
 * @param defaultErrorMessage - The default error message to use if the error does not contain one.
 */
export function handleErrorWithToast({
  error,
  title,
  defaultErrorMessage = "Ha ocurrido un error.",
}: {
  error: unknown;
  title?: string;
  defaultErrorMessage?: string;
}): void {
  if (error instanceof Error) {
    toast({
      title,
      description: <MessageDisplay message={error.message} />,
      className: "bg-red-500 text-white",
    });

    return;
  }

  toast({
    title,
    description: defaultErrorMessage,
    className: "bg-red-500 text-white",
  });
}
