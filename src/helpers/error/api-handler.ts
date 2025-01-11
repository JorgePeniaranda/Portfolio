import type {ErrorResponse} from "@/types/responses";

import {z} from "zod";

import {isPrismaError} from "../guards/is-prisma-error";

import {prismaHandler} from "./prisma-handler";

/**
 * A helper function that formats API errors into a readable error response.
 *
 * @param {unknown} error - The error object to handle.
 * @returns {Response} A response object containing the error message and status code.
 */
export function handleApiError(error: unknown): Response {
  // If the error is a Prisma error
  if (isPrismaError(error)) {
    const {statusCode, message} = prismaHandler(error);

    // Return a 500 error response
    return Response.json(
      {
        error: message,
      } satisfies ErrorResponse,
      {status: statusCode},
    );
  }

  // If the error is a Zod validation error
  if (error instanceof z.ZodError) {
    return Response.json(
      {
        errors: error.errors.map((error) => `${error.path}: ${error.message}`), // Map Zod validation errors to messages
      } satisfies ErrorResponse,
      {status: 400},
    );
  }

  // Return a 500 error response
  return Response.json(
    {
      message: "An error occurred", // Generic error message
      error: error instanceof Error ? error.message : "Unknown error occurred.", // Error message or fallback for unknown errors
    } satisfies ErrorResponse,
    {status: 500},
  );
}
