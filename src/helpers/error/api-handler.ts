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
        type: "PrismaError",
        title: "A Prisma error occurred.",
        status: statusCode,
        detail: message,
      } satisfies ErrorResponse,
      {
        status: statusCode,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "application/problem+json",
        },
      },
    );
  }

  // If the error is a Zod validation error
  if (error instanceof z.ZodError) {
    const {errorTextReduce, errorList} = handleZodError(error);

    return Response.json(
      {
        type: "ValidationError",
        title: "A validation error occurred.",
        status: 400,
        detail: errorTextReduce,
        fieldErrors: errorList.map((error) => ({
          type: "ValidationError",
          title: "A validation error occurred.",
          status: 400,
          detail: error,
        })),
      } satisfies ErrorResponse,
      {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "application/problem+json",
        },
      },
    );
  }

  // Else, return a generic 500 error response
  return Response.json(
    {
      type: "InternalServerError",
      title: "An internal server error occurred.",
      status: 500,
      detail: error instanceof Error ? error.message : "Unknown error occurred.",
    } satisfies ErrorResponse,
    {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        "Content-Type": "application/problem+json",
      },
    },
  );
}
