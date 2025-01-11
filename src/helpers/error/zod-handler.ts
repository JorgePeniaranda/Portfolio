import z from "zod";

/**
 * A helper function that formats Zod validation errors into a readable error message.
 *
 * @param {ZodError} error - The Zod validation error object.
 */
export function handleZodError(error: z.ZodError): {
  errorTextReduce: string;
  errorList: string[];
} {
  const formatErrorMessages = error.errors.map((error) => `${error.path}: ${error.message}`);

  return {
    errorTextReduce: formatErrorMessages.join(", "),
    errorList: formatErrorMessages,
  };
}
