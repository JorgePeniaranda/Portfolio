import {Prisma} from "@prisma/client";

import {PRISMA_ERROR_MESSAGES} from "@/messages/errors/prisma-errors";

const STATUS_CODE = {
  400: ["P2000", "P2006", "P2009", "P2013", "P2019", "P2020", "P2026"],
  404: ["P2001", "P2015", "P2018", "P2021", "P2022", "P2025"],
  409: ["P2002", "P2014"],
  422: ["P2003", "P2005", "P2011", "P2012", "P2023"],
  500: [
    "P1000",
    "P1001",
    "P1002",
    "P1003",
    "P1008",
    "P1010",
    "P1011",
    "P1015",
    "P1016",
    "P2024",
    "P2028",
    "P2034",
    "P2035",
    "P2036",
    "P2037",
  ],
};

/**
 * Returns the corresponding HTTP status code based on the provided Prisma error code.
 * It looks for the error code in the `STATUS_CODE` dictionary and returns the associated status code.
 * If no match is found, it returns a default status code of 500.
 *
 * @param {string} prismaErrorCode - The error code from Prisma to map to an HTTP status code.
 * @returns {number} The HTTP status code corresponding to the Prisma error code, or 500 if not found.
 */
function getStatusCode(prismaErrorCode: string): number {
  // Iterate over the STATUS_CODE dictionary entries
  for (const [statusCode, errorCodes] of Object.entries(STATUS_CODE)) {
    // Check if the prismaErrorCode exists in the list of error codes for the current status code
    if (errorCodes.includes(prismaErrorCode)) {
      return parseInt(statusCode); // Return the status code as a number
    }
  }

  return 500; // Default status code if the error code is not found
}

/**
 * Handles Prisma errors and returns an object with an appropriate HTTP status code and error message.
 * It checks if the error is a known Prisma error and if the error code has a corresponding message.
 * If so, it returns that message and the related status code. Otherwise, it returns a generic internal server error.
 *
 * @param {Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientUnknownRequestError | Prisma.PrismaClientRustPanicError} error - The error object thrown by Prisma.
 * @returns {{statusCode: number, message: string}} An object containing the HTTP status code and error message.
 */
export function prismaHandler(
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientRustPanicError,
): {statusCode: number; message: string} {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code in PRISMA_ERROR_MESSAGES
  ) {
    return {
      statusCode: getStatusCode(error.code),
      message: PRISMA_ERROR_MESSAGES[error.code],
    };
  }

  return {
    statusCode: 500,
    message: "Internal server error.",
  };
}
