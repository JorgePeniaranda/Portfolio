import type {APIRoute} from "astro";

import {Prisma} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";
import {StackCreateSchema} from "@/schemas/stack/create";

/**
 * POST handler to create a new stack.
 * - Parses the request body.
 * - Validates it using the `StackCreateSchema`.
 * - Creates a new stack in the database.
 */
export const POST: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      try {
        const body = await request.json();
        const validationResult = StackCreateSchema.parse(body);
        const response = await databaseClient.stack.create({
          data: validationResult,
        });

        return {
          success: true,
          message: "Stack created successfully",
          data: response,
        };
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002" &&
          Array.isArray(error.meta?.target) &&
          error.meta?.target.includes("key")
        ) {
          throw new Error("The provided key is already in use");
        }

        throw error;
      }
    },
    {successStatusCode: 201},
  );
};
