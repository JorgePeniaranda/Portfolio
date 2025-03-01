import type { Project } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

export type GetAllProjectMinResponse = Pick<
  Project,
  'id' | 'key' | 'name' | 'logoUrl' | 'stackCategory' | 'status'
>[];

/**
 * Get all projects with minimal information.
 * @returns A list of projects
 * @throws An error if the projects could not be retrieved
 */
export async function getAllProjectMin(): Promise<GetAllProjectMinResponse> {
  try {
    const { data: response } =
      await apiClient.get<GetAllProjectMinResponse>('/api/project/min.json');

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo obtener la lista de proyectos.',
    });
  }
}
