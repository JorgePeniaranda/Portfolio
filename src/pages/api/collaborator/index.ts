import type {APIRoute} from "astro";

import {z} from "zod";

import {databaseClient} from "../../../helpers/client/prisma";
import {RequestHandler} from "../../../helpers/common/request-handler";
import {CollaboratorCreateSchema} from "../../../schemas/collaborator/create";
import {CollaboratorUpdateSchema} from "../../../schemas/collaborator/update";

// Disable prerendering for this route
export const prerender = false;

/**
 * POST handler to create a new collaborator.
 * - Parses the request body.
 * - Validates it using the `CollaboratorCreateSchema`.
 * - Creates a new collaborator in the database.
 */
export const POST: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = CollaboratorCreateSchema.parse(body);
      const response = await databaseClient.colaborator.create({
        data: validationResult,
      });

      return {
        success: true,
        message: "Collaborator created successfully",
        data: response,
      };
    },
    {successStatusCode: 201},
  );
};

/**
 * PUT handler to update an existing collaborator.
 * - Parses the request body.
 * - Validates it using the `CollaboratorUpdateSchema`.
 * - Updates the collaborator in the database.
 */
export const PUT: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = CollaboratorUpdateSchema.parse(body);

      const response = await databaseClient.colaborator.update({
        data: {
          nickname: validationResult.nickname,
          githubUsername: validationResult.githubUsername,
          linkedinUsername: validationResult.linkedinUsername,
        },
        where: {id: validationResult.id},
      });

      return {
        success: true,
        message: "Collaborator updated successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};

/**
 * DELETE handler to remove multiple collaborators.
 * - Parses the request body.
 * - Validates it as an array of numbers (IDs).
 * - Deletes collaborators from the database.
 */
export const DELETE: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = z.array(z.number()).parse(body);

      const response = await databaseClient.colaborator.deleteMany({
        where: {id: {in: validationResult}},
      });

      return {
        success: true,
        message: "Collaborators deleted successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};
