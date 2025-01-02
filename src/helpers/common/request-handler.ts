import type {ApiResponse} from "@/types/responses";

import z from "zod";

/**
 * A higher-order function that manages the request handling process in an API endpoint.
 * It accepts a handler function for processing the request and a configuration object
 * that includes the request context and an optional status code for successful responses.
 *
 * The function provides centralized error handling:
 * - **Zod validation errors** are returned with a `400` status and the validation error messages.
 * - **General errors** during the request process are returned with a `500` status and a generic error message.
 *
 * @param {Function} handler - The handler function that processes the request and returns an `ApiResponse`.
 *                              It receives the `APIContext` as input and returns a promise that resolves to an `ApiResponse`.
 * @param {Object} config - The configuration object for the request handler.
 * @param {number} [config.successStatusCode=200] - An optional custom status code for a successful response (default is 200).
 *
 * @returns {Promise<Response>} A promise that resolves to a `Response` object containing the status and data.
 *
 * @example
 * const response = await RequestHandler(myRequestHandler, {
 *   context,
 *   successStatusCode: 201,  // Optional custom status code for success
 * });
 *
 * @throws {ZodError} If the handler function throws a ZodError, a `400` response with validation errors is returned.
 * @throws {Error} If an unexpected error occurs, a `500` response with a generic error message is returned.
 */
export const RequestHandler = async (
  handler: () => Promise<Omit<ApiResponse, "success">>, // The handler that processes the request and returns an ApiResponse
  {
    successStatusCode = 200, // Default value is 200 if no status code is provided
  }: {
    successStatusCode?: number; // Optional custom status code for success
  },
): Promise<Response> => {
  let response: ApiResponse;

  try {
    // Call the handler function with the provided context to process the request
    response = {
      ...(await handler()),
      success: true, // Set the success flag to true
    };

    // Return the response with the provided success status code (or default 200)
    return Response.json(response, {
      status: successStatusCode,
    });
  } catch (error) {
    // If the error is a Zod validation error
    if (error instanceof z.ZodError) {
      response = {
        success: false,
        message: "Invalid request", // Message indicating that the request data was invalid
        errors: error.errors.map((error) => `${error.path}: ${error.message}`), // Map Zod validation errors to messages
      };

      // Return a 400 error response with validation errors
      return Response.json(response, {status: 400});
    } else {
      // If an unknown error occurs, return a generic error message
      response = {
        success: false,
        message: "An error occurred", // Generic error message
        error: error instanceof Error ? error.message : "Unknown error occurred.", // Error message or fallback for unknown errors
      };

      // Return a 500 error response
      return Response.json(response, {status: 500});
    }
  }
};
