import type {ErrorResponse} from "@/types/responses";

import {z} from "zod";

import {isPrismaError} from "../guards/is-prisma-error";

import {prismaHandler} from "./prisma-handler";
import {handleZodError} from "./zod-handler";

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

    return Response.json(
      {
        error: message,
      } satisfies ErrorResponse,
      {status: statusCode},
    );
  }

  // If the error is a Zod validation error
  if (error instanceof z.ZodError) {
    const {errorTextReduce, errorList} = handleZodError(error);

    return Response.json(
      {
        error: errorTextReduce,
        errors: errorList,
      } satisfies ErrorResponse,
      {status: 400},
    );
  }

  // Else, return a generic 500 error response
  return Response.json(
    {
      error: error instanceof Error ? error.message : "Unknown error occurred.",
    } satisfies ErrorResponse,
    {status: 500},
  );
}
