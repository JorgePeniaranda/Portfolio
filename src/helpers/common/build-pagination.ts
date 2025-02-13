import type { PaginationRequest } from '@/types/responses';

import { PaginationParamsSchema } from '@/schemas/common/pagination-params';

/**
 * Extracts pagination parameters (`page` and `size`) from a URL.
 * - Returns `undefined` if no pagination parameters are provided.
 * - Ensures the parameters are valid through `PaginationParamsSchema`.
 *
 * @param url - The URL containing the query parameters.
 * @returns A `PaginationRequest` object or `undefined` if no pagination parameters are found.
 */
export function BuildPaginationByURL(url: string): PaginationRequest | undefined {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  if (params.has('page') && params.has('size')) {
    const parsedParams = PaginationParamsSchema.parse(Object.fromEntries(params));

    return parsedParams;
  }

  return undefined;
}
